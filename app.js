const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const userController = require('./controllers/users');

const postController = require('./controllers/posts');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index1.html'));
});

// sign up
app.post('/signUp', userController.signUp);

// logIn
app.post('/login', userController.login);

// view all created users
app.get('/users', userController.getAllUsers);

app.use(userController.verify);

// create post
app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/create.html'));
});
app.post('/posts', postController.createPost);

// get all Posts (includes everything)
app.get('/posts', postController.getPosts);//get feed html
app.get('/feed', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/feed.html`));
});

// get users posts
app.get('/users/posts', postController.getUsersPosts);
app.get('/profile', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/profile.html`));
});

//get other users posts
app.get('/users/:id/posts', postController.viewUsersPosts);
app.get('/view/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/viewing.html'));
});


// update post
app.get('/view/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/viewPost.html'));
});
app.put('/posts/:id', postController.updatePost);

// get specific post
app.get('/posts/:id', postController.getPostById);

// get info of specific user
app.get('/user', userController.getUserById);

// updates bio
app.put('/user', userController.updateBio);

// deletes post
app.delete('/posts/:id', postController.deletePost);

// logout
app.get('/logout', userController.logout);


app.listen(port, () => console.log(`Now listening on port... ${port}`));
