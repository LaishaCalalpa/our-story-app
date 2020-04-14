const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const userController = require('./controllers/users');

const postController = require('./controllers/posts')

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// sign up
app.post('/signUp', userController.signUp);

app.post('/login', userController.login);

// view all created users
app.get('/getUsers', userController.getAllUsers);

app.use(userController.verify);

//create post
app.post('/createPost', postController.createPost);

//get all Posts (includes everything)
app.get('/allPosts', postController.getPosts);

//get users posts
app.get('/userPosts/:id', postController.getUsersPosts);

app.put('/updateProfile', userController.updateBio);

app.delete('/deletePost/:id', postController.deletePost);

app.get('/logout', userController.logout);


app.listen(port, () => console.log(`Now listening on port... ${port}`));