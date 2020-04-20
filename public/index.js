
const deletePost = async (postId) => {
  await fetch(`/posts/${postId}`, {
    method: 'DELETE',
  });
  window.location.reload();
};

const feed = async () => {
  const res = await fetch('/posts');
  const posts = await res.json();
​
  posts.forEach((post) => {
    const article = document.createElement('article');
    const container = document.getElementById('container');
    article.innerHTML = `
      <div class="uk-card uk-card-default uk-card-hover uk-card-small uk-card-body">
          <div class="uk-card-header">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                  <div class="uk-width-auto">
                      <a href="/view/${post.user_id}">${post.user_id}</a>
                  </div>
                  <div class="uk-width-expand">
                      <h3 class="uk-card-title uk-margin-remove-bottom">${post.title}</h3>
                      <p class="uk-text-meta uk-margin-remove-top">${post.name}</p>
                  </div>
              </div>
          </div>
          <div class="uk-card-body">
              <p>${post.post}</p>
          </div>
          <div class="uk-card-footer">
              <a href="#" class="uk-button uk-button-text">Read more</a>
          </div>
      </div><br>
    `;
    container.append(article);
   });
 };

const switchToForm = () => {
  const bioSec = document.getElementById('bioSec');
  const bio = document.getElementById('bioText');
  const bioText = bio.textContent;

  bioSec.innerHTML = `
    <form  id="editPost">
      <fieldset>
        <label for="title">Bio?</label>
        <input type="text" name="oldBio" id="title" value="${bioText}">
        <input  type="submit" value="Save">
      </fieldset>
    </form>
  `;

  const newForm = document.querySelector('#editPost');
  newForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBio = e.target.oldBio.value;


    fetch('/user', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bio: newBio,
      }),
    });

    bioSec.innerHTML = `
      <p id= "bioText">${newBio}</p>
      <button id="edit" onClick="switchToForm()">Edit Bio</button>
    `;
  });
};

const userInfo = async () => {
  const res = await fetch('/user');
  const userObj = await res.json();
  const userSec = document.getElementById('userInfo');
​
  userSec.innerHTML = `
    <h1 class="uk-heading-small uk-margin-remove">${userObj.username}</h1>
    <div id="bioSec" class="uk-comment-body">
      <p id= "bioText">${userObj.bio}</p>
      <button id="edit" onClick="switchToForm()">Edit Bio</button>
    </div>
  `;
};

const profile = async () => {
  const res = await fetch('/users/posts');
  const posts = await res.json();
​
  posts.forEach((post) => {
    const article = document.createElement('article');
    const container = document.getElementById('profile-container');
    article.innerHTML = `
        <div class="uk-card uk-card-default uk-card-hover uk-card-small uk-card-body">
          <div class="uk-card-header">
              <div class="uk-grid-small uk-flex-middle uk-grid">
                  <div class="uk-width-expand">
                      <h3 class="uk-card-title uk-margin-remove-bottom">${post.title}</h3>
                      <p class="uk-text-meta uk-margin-remove-top">${post.name}</p>
                  </div>
              </div>
          </div>
          <div class="uk-card-body">
              <p>${post.post}</p>
          </div>
          <div class="uk-card-footer">
            <a href="/users/posts/${post.post_id}" class="uk-button uk-button-text">Read more</a>
            <button type="submit" name="button" class="uk-button uk-button-text" onClick="deletePost(${post.post_id})">Delete</button>
          </div>
        </div><br>
    `;
    container.append(article);
  });
};

feed();
profile();
userInfo();
