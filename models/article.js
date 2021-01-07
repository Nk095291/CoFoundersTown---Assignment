const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  uesrId: {
    type: String,
    required: true
  },
  title: { 
    type: String,
    required: true
  },
  context : {
      type : String, 
      required : true
  },
  date: {
     type: Date,
    default: Date.now 
  }
});



const Article = mongoose.model('article', userSchema);


module.exports = Article;