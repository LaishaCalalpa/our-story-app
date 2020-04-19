function switchToForm() {
  const container = document.getElementById('post');

  const title = document.getElementById('title');
  const titleText = title.textContent;

  const body = document.getElementById('body');
  const bodyText = body.textContent;

  const author = document.getElementById('author');
  const authorText = author.textContent;

  container.innerHTML = `
  <form  id="editPost">
    <fieldset>
      <label for="title">Title?</label>
      <input type="text" name="oldTitle" id="title" value="${titleText}">
      
      <label for="post">Post</label>
      <textarea name="oldPost" id="post">${bodyText}</textarea>
      
      <label for="name">Your Name?</label>
      <input type="name" name="oldName" id="name" value="${authorText}">
      
      <input  type="submit" value="Save">
    </fieldset>
  </form>
  `;

  const postId = window.location.pathname.split('/')[3];
  const newForm = document.querySelector('#editPost');
  newForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTitle = e.target.oldTitle.value;
    const newPost = e.target.oldPost.value;
    const newName = e.target.oldName.value;


    fetch(`/posts/${postId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle,
        post: newPost,
        name: newName,
      }),
    });


    container.innerHTML = `
      <h1 id="title">${newTitle}</h1>
      <p id ="body">${newPost}</p>
      <cite id="author">${newName}</cite>
      <button id="edit" onClick="switchToForm()">Edit</button>
    `;
  });
}

const renderPost = async () => {
  const postId = window.location.pathname.split('/')[3];
  const postSec = document.getElementById('post');
  const res = await fetch(`/posts/${postId}`);
  const postObj = await res.json();

  postSec.innerHTML = `
      <h1 id="title">${postObj.title}</h1>
      <p id ="body">${postObj.post}</p>
      <cite id="author">${postObj.name}</cite>
      <button id="edit" onClick="switchToForm()">Edit</button>
    `;
};

renderPost();
