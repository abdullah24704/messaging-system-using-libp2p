# P2P chat application

This project is a peer-to-peer (P2P) messaging system built using JavaScript and HTML, which allows users to sign up, sign in, and communicate with other peers via a specific topic.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Installation](#installation)  
- [Running](#running)
- [Documentation](#documentation)

## Project Overview

This project is a peer-to-peer (P2P) messaging application that integrates both backend and frontend using Vite. The backend is powered by Express, MongoDB for data storage, and WebRTC for real-time communication. The application allows users to sign up, sign in, and communicate over a common topic using GossipSub.

### Key Features

1. **Vite Integration**: Vite is used to run both the backend and frontend simultaneously.
2. **Authentication**: The login page, handled by `main.js`, authenticates users via routes defined in our Express server.
3. **CORS Handling**: Since the frontend (on port 5173) and backend (on port 5000) use different ports, CORS is enabled to allow smooth communication between them.
4. **MongoDB Storage**: User data and messages are stored securely in MongoDB.
5. **Message Communication**: After successful sign-in, users are redirected to a new page where they can send messages. This page is managed by `index.js`, which handles real-time message exchanges via WebRTC.
6. **GossipSub Protocol**: The app uses GossipSub to ensure that messages are sent and received under a common topic for efficient P2P communication.
7. **Event Emitter**: An event emitter captures data from the frontend and ensures it is stored in the database. The database server handles these requests on port 3000.it's seperatly used beacuse using vite you can handle backend req


## Getting Started

To use this application, follow these steps:

**Sign Up:** Create an account using your preferred credentials.

**Sign In:** After signing up, use your credentials to log in.

**Connect to a Peer:** You will need a valid PeerId of the user you want to connect with.

**Send Messages on a Topic:** Choose or create a topic, and send messages to connected peers.

## Installation
1. **Node.js:** Make sure you have Node.js installed on your machine.

2. **MongoDB:** You should have MongoDB installed or use a cloud-based MongoDB 
service.

3. Open terminal windows in the `./src` directory.

4. **Install dependencies**
```console
npm install
```

## Running 


1. First you will have to set env private key 
```bash
set p2p-jwtPrivateKey="anything"
```
on mac
```bash
sudo p2p-jwtPrivateKey="anything"
```
Start the application
```bash
npm run dev
```
• A browser will automatically open, where you should have to sign up using valid email and username and password. 
Then on same browser you have to login.

•A new page will appear, On terminal Copy multiaddress from relay server and paste it. It will be now connected to relay server

•Now copy the listening address and open second browser with `http://localhost:5173/p2p.html`, use the copied listening address and paste in multiaddress.

•Select same topic on both browser.

•both peers are now connected and can send messages 

You should see the message appear in the output section towards the bottom of the other browser window.

`any error will log in mongodb not on console ` 

## Documentation

**• libp2p Documentation.**

**• MongoDB Documentation.**

**• Node.js Documentation.**

**• Express.js Documentation.**

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)