const userInfo = async () => {
  const userId = window.location.pathname.split('/')[2];
  const res = await fetch(`/users/${userId}`);
  const userObj = await res.json();
  const userSec = document.getElementById('userInfo');

  userSec.innerHTML = `
    <h1>${userObj.username}</h1>
    <p>${userObj.bio}</p>
  `;
};

const view = async () => {
  const user_id = window.location.pathname.split('/')[2];
  const res = await fetch(`/users/${user_id}/posts`);
  const posts = await res.json();

  posts.forEach((post) => {
    console.log(post);
    const article = document.createElement('article');
    const container = document.getElementById('view-container');
    article.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.post}</p>
      <cite>${post.name}</cite>
    `;
    container.appendChild(article);
  });
};

view();
userInfo();
