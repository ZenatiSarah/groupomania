require('dotenv').config();
const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const userRouter = require('./api/users/user.router');
const postRouter = require('./api/post/post.router');


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('./images', express.static(path.join(__dirname, 'images')))

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/publications', postRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Serveur à l'écoute sur le PORT", process.env.APP_PORT)
});

