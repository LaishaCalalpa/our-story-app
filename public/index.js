const feed = async() => {
  const res = await fetch(`/posts`);
  const posts = await res.json();

  posts.forEach((post) => {
    const article = document.createElement('article');
    const container = document.getElementById('container');
    article.innerHTML = `
      <cite>${post.user_id}</cite>
      <h4>${post.title}</h4>
      <p>${post.post}</p>
      <cite>${post.name}</cite>
    `;
    container.appendChild(article);
  });
}

const profile = async() => {
  const res = await fetch(`/users/posts`);
  const posts = await res.json();

  posts.forEach((post) => {
    const article = document.createElement('article');
    const container = document.getElementById('container');
    article.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.post}</p>
      <cite>${post.name}</cite>
    `;
    container.appendChild(article);
  });
}

feed();
profile();
