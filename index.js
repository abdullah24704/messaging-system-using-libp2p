import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { dcutr } from '@libp2p/dcutr'
import { identify } from '@libp2p/identify'
import { webRTC } from '@libp2p/webrtc'
import { webSockets } from '@libp2p/websockets'
import * as filters from '@libp2p/websockets/filters'
import { multiaddr } from '@multiformats/multiaddr'
import { createLibp2p } from 'libp2p'
import { fromString, toString } from 'uint8arrays'

const DOM = {
  peerId: () => document.getElementById('peer-id'),

  dialMultiaddrInput: () => document.getElementById('dial-multiaddr-input'),
  dialMultiaddrButton: () => document.getElementById('dial-multiaddr-button'),

  subscribeTopicInput: () => document.getElementById('subscribe-topic-input'),
  subscribeTopicButton: () => document.getElementById('subscribe-topic-button'),

  sendTopicMessageInput: () => document.getElementById('send-topic-message-input'),
  sendTopicMessageButton: () => document.getElementById('send-topic-message-button'),

  output: () => document.getElementById('output'),

  listeningAddressesList: () => document.getElementById('listening-addresses'),
  peerConnectionsList: () => document.getElementById('peer-connections'),
  topicPeerList: () => document.getElementById('topic-peers')
}

const appendOutput = (line) => {
  DOM.output().innerText += `${line}\n`
}
const clean = (line) => line.replaceAll('\n', '')

const libp2p = await createLibp2p({
  addresses: {
    listen: [
      '/webrtc'
    ]
  },
  transports: [
    webSockets({
      filter: filters.all
    }),
    webRTC(),
    circuitRelayTransport({
      discoverRelays: 1
    })
  ],
  connectionEncryption: [noise()],
  streamMuxers: [yamux()],
  connectionGater: {
    denyDialMultiaddr: () => {
      return false
    }
  },
  services: {
    identify: identify(),
    pubsub: gossipsub(),
    dcutr: dcutr()
  },
  connectionManager: {
    minConnections: 0
  }
})

DOM.peerId().innerText = libp2p.peerId.toString()

function updatePeerList () {
  const peerList = libp2p.getPeers()
    .map(peerId => {
      const el = document.createElement('li')
      el.textContent = peerId.toString()

      const addrList = document.createElement('ul')

      for (const conn of libp2p.getConnections(peerId)) {
        const addr = document.createElement('li')
        addr.textContent = conn.remoteAddr.toString()

        addrList.appendChild(addr)
      }

      el.appendChild(addrList)

      return el
    })
  DOM.peerConnectionsList().replaceChildren(...peerList)
}

libp2p.addEventListener('connection:open', () => {
  updatePeerList()
})
libp2p.addEventListener('connection:close', () => {
  updatePeerList()
})

libp2p.addEventListener('self:peer:update', () => {
  const multiaddrs = libp2p.getMultiaddrs()
    .map((ma) => {
      const el = document.createElement('li')
      el.textContent = ma.toString()
      return el
    })
  DOM.listeningAddressesList().replaceChildren(...multiaddrs)
})

DOM.dialMultiaddrButton().onclick = async () => {
  const ma = multiaddr(DOM.dialMultiaddrInput().value)
  appendOutput(`Dialing '${ma}'`)
  await libp2p.dial(ma)
  appendOutput(`Connected to '${ma}'`)
}

DOM.subscribeTopicButton().onclick = async () => {
  const topic = DOM.subscribeTopicInput().value
  appendOutput(`Subscribing to '${clean(topic)}'`)

  libp2p.services.pubsub.subscribe(topic)

  DOM.sendTopicMessageInput().disabled = undefined
  DOM.sendTopicMessageButton().disabled = undefined
}

DOM.sendTopicMessageButton().onclick = async () => {
  const topic = DOM.subscribeTopicInput().value
  const message = DOM.sendTopicMessageInput().value
  appendOutput(`Sending message '${clean(message)}'`)

  await libp2p.services.pubsub.publish(topic, fromString(message))
}

setInterval(() => {
  const topic = DOM.subscribeTopicInput().value

  const peerList = libp2p.services.pubsub.getSubscribers(topic)
    .map(peerId => {
      const el = document.createElement('li')
      el.textContent = peerId.toString()
      return el
    })
  DOM.topicPeerList().replaceChildren(...peerList)
}, 500)

libp2p.services.pubsub.addEventListener('message', event => {
  const topic = event.detail.topic
  const message = toString(event.detail.data)

  appendOutput(`Message received on topic '${topic}'`)
  appendOutput(message)
})
libp2p.services.pubsub.addEventListener('message', async (event) => {
  const topic = event.detail.topic;
  const message = toString(event.detail.data);
  const peerId = libp2p.peerId.toString();


  await fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      peerId,
      message,
    }),
  });
});
