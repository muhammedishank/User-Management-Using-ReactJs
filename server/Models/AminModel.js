const mongoose = require('mongoose');
const bycript = require('bcrypt')
const adminSchema = new mongoose.Schema({
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
  }
})
// adminSchema.pre("save", async function (next) {
//   const salt = await bycript.genSalt();
//   this.password = await bycript.hash(this.password, salt)
//   next();
// })
adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    // const auth = await bycript.compare(password, admin.password);
    if (password === admin.password) {
      return admin;
    }
    throw Error("Incorrect Password")
  }
  throw Error("Incorrect Email")
}

module.exports = mongoose.model("Admin", adminSchema)