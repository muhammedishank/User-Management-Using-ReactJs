const mongoose = require('mongoose');
const bycript = require('bcrypt')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  block:{
    type:Boolean,
    default:false

  }
})
userSchema.pre("save", async function (next) {
  const salt = await bycript.genSalt();
  this.password = await bycript.hash(this.password, salt)
  next();
})
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bycript.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password")
  }
  throw Error("Incorrect Email")
}

module.exports = mongoose.model("Users", userSchema)