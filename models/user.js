const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: { 
    type: String,
    required: true
  },
  username : {
      type : String, 
      required : true
  },
  name :{
    type: String, 
    required : true 
  },
  age : {
    type : Number, 
    required : true 
  }
});


userSchema.pre('save', async function(next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
}


const User = mongoose.model('user', userSchema);

module.exports = User;