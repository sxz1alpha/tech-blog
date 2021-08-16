async function addPostRouter(event) {
    event.preventDefault();
    document.location.replace('/post');
}
document.querySelector('#add-post').addEventListener('click', addPostRouter);