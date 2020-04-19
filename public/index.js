// const feed = async() => {
//   const res = await fetch(`/posts`);
//   const posts = await res.json();

//   posts.forEach((post) => {
//     const article = document.createElement('article');
//     const container = document.getElementById('container');
//     article.innerHTML = `
//       <cite>${post.user_id}</cite>
//       <h4>${post.title}</h4>
//       <p>${post.post}</p>
//       <cite>${post.name}</cite>
//     `;
//     container.appendChild(article);
//   });
// }
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
    // fetch request. put request to api endpoint
    
    fetch('/user',{
      method: 'PUT', 
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        bio: newBio,
      })
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
  
  userSec.innerHTML = `
    <h1>${userObj.username}</h1>
    <div id="bioSec"> 
      <p id= "bioText">${userObj.bio}</p>
      <button id="edit" onClick="switchToForm()">Edit Bio</button>
    </div>
  `;
  
};

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
      <a href="/view/${post.post_id}">View</a>
    `;
    container.appendChild(article);
  });
}

// feed();
profile();
userInfo();


