const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const userController = require('./controllers/users');
const postController = require('./controllers/posts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/login', userController.login);

app.use(userController.verify);

app.put('/updateProfile', userController.updateBio);

app.delete('/deletePost/:id', postController.deletePost);

app.get('/logout', userController.logout);

app.listen(port, () => console.log(`Now listening on port ${port}`));
