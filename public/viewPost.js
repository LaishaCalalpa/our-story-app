function switchToForm() {
  const container = document.getElementById('post');
​
  const title = document.getElementById('title');
  const titleText = title.textContent;
​
  const body = document.getElementById('body');
  const bodyText = body.textContent;
​
  const author = document.getElementById('author');
  const authorText = author.textContent;
​
  container.innerHTML = `
  <form  id="editPost" class="uk-grid-1-1">
    <center>
      <fieldset class="uk-fieldset uk-form-horizontal">
        <div class="uk-margin uk-width-1-2">
          <label for="title" class="uk-form-label">Title?</label>
          <input type="text" name="oldTitle" id="title" class="uk-input" value="${titleText}">
        </div>

        <div class="uk-margin uk-width-1-2">
          <label for="post" class="uk-form-label">Post</label>
          <textarea name="oldPost" id="post" rows="10" class="uk-textarea">${bodyText}</textarea>
        </div>

        <div class="uk-margin uk-width-1-2">
          <label for="name" class="uk-form-label">Your Name?</label>
          <input type="name" name="oldName" id="name" class="uk-input" value="${authorText}">
        </div>

        <input  type="submit" class="uk-button uk-button-text" value="Save">
      </fieldset>
    </center>
  </form>
  `;

​
​
  const postId = window.location.pathname.split('/')[3];
  const newForm = document.querySelector('#editPost');
  newForm.addEventListener('submit', (e) => {
    e.preventDefault();
​
    const newTitle = e.target.oldTitle.value;
    const newPost = e.target.oldPost.value;
    const newName = e.target.oldName.value;
​
​
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
​
​
    container.innerHTML = `
    <center>
      <article class="uk-article">
        <h1 id="title">${newTitle}</h1>
        <p id ="body">${newPost}</p>
        <cite id="author">${newName}</cite>
        <div class="uk-grid-small">
          <button id="edit" class="uk-button uk-button-text" onClick="switchToForm()">Edit</button>
        </div>
      </article>
    </center>
    `;
  });
}
​
const renderPost = async () => {
  const postId = window.location.pathname.split('/')[3];
  const postSec = document.getElementById('post');
  const res = await fetch(`/posts/${postId}`);
  const postObj = await res.json();
​
  postSec.innerHTML = `
    <center>
      <article class="uk-article">
        <h1 id="title" class="uk-article-title">${postObj.title}</h1>
        <p id ="body" class="uk-text-lead">${postObj.post}</p>
        <cite id="author" class="uk-article-meta">${postObj.name}</cite>
        <div class="uk-grid-small">
          <button id="edit" class="uk-button uk-button-text" onClick="switchToForm()">Edit</button>
        </div>
      </article>
    </center>
    `;
};
​
renderPost();
