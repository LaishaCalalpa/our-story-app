const deletePost = async(postId) => {
  await fetch(`/posts/${postId}`, {
    method: 'DELETE'
  })
  window.location.reload();
}

const feed = async() => {
  const res = await fetch(`/posts`);
  const posts = await res.json();

  posts.forEach((post) => {
    const article = document.createElement('article');
    const container = document.getElementById('container');
    article.innerHTML = `
      <a href="/view/${post.user_id}">${post.user_id}</a>
      <h4>${post.title}</h4>
      <p>${post.post}</p>
      <cite>${post.name}</cite>
    `;
    container.append(article);
  });
}

const profile = async() => {
  const res = await fetch(`/users/posts`);
  const posts = await res.json();

  posts.forEach((post) => {
    const article = document.createElement('article');
    const container = document.getElementById('profile-container');
    article.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.post}</p>
      <cite>${post.name}</cite>

      <button type="submit" name="button" onClick="deletePost(${post.post_id})">Delete</button>
    `;
    container.append(article);
  });
}

feed();
profile();
