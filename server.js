 //  https://murmuring-shore-80548.herokuapp.com/
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
  }
  }
});


db.select('*').from('users')
    .then(data => {
      
    });



const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get("/", (req, res) => {
res.send("it's working!");
});

app.post('/signin', (req, res) => {signin.handleSignin(db, bcrypt, req, res)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});    
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
console.log(`app is running on port ${process.env.PORT}`);
});

