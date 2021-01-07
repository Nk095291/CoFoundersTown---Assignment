const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Article = require('../models/article');
const { JWT_SECRET } = require('../configuration');
console.log(JWT_SECRET);
signToken = user => {
  return JWT.sign({
    iss: 'Nitin_kumar',
    sub: user.id,         // use to identify an user
    iat: new Date().getTime(), 
    exp: new Date().setDate(new Date().getDate() + 1) 
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, username, name, age } = req.value.body;

    // Check if there is a user with the same email
    const foundUserWithSameEmail = await User.findOne({ email });
    if (foundUserWithSameEmail) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    const foundUserWithSameUsername = await User.findOne({ username });
    if (foundUserWithSameUsername) { 
      return res.status(403).json({ error: 'username is already in use'});
    }

    // Create a new user
    const newUser = new User({ email, password, username, name, age});
    await newUser.save();

    // Respond with token
    const token = signToken(newUser);

    res.status(200).json({token});


  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  username: async (req, res, next) => {
    const user = await User.find( {_id : req.user._id });
    const articleByCurUser = await Article.find({uesrId : req.user._id}).sort('-date');

    const data = {
      userinfo : {
          username : user[0].username, 
          name : user[0].name , 
          email : user[0].email, 
          age : user[0].age
      } ,
      artcles : articleByCurUser
    }
    // return user's data
    res.status(200).json({ status : "success", data });
  },

  home: async (req, res, next) => {

    const articles = await Article.find({}).sort('-date');

    // return articles 
    res.status(200).json({status : "success", data : articles});

  },
  publish: async (req, res, next) => {

    const uesrId = req.user._id; 
    const {title, context } = req.value.body;

    const newArticle = new Article({ uesrId, title, context });
    await newArticle.save();

    res.status(200).json({status :"sucess", msg : "new article is created"});
  }
}