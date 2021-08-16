

async function addNewPost(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const text = document.querySelector('#content-input').value;
    
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            text
        })
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.submit').addEventListener('click', addNewPost);
