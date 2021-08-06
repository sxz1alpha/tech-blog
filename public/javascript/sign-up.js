async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();

    if( username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'content-type': 'application/json' }
        });
        
        if(response.ok) {
            console.log('success');
            document.location.replace("/login")
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.sign-up-form').addEventListener('submit', signupFormHandler);