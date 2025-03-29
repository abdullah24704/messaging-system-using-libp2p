document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('signin-submit').addEventListener('click', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-pass').value;
        
        const response = await fetch('http://localhost:5000/auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
            
            window.location.href = 'p2p.html'; 
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    });
    
    document.getElementById('signup-submit').addEventListener('click', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-pass').value;
        
        const response = await fetch('http://localhost:5000/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });
        
        if (response.ok) {
            alert('Sign Up Successful');
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    });
});
