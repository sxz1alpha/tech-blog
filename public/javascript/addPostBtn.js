async function addPostRouter(event) {
    event.preventDefault();
    document.location.replace('/dashboard/post');
}
document.querySelector('#add-post').addEventListener('click', addPostRouter);