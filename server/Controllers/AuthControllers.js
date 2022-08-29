const UserModel = require("../Models/UserModel");
const AdminModel = require("../Models/AminModel");
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 3600

const createToken = (id) => {
  return jwt.sign({ id }, "ishan super secret key", { expiresIn: maxAge })
}
const createAdminToken = (id) => {
  return jwt.sign({ id }, "admin super secret key", { expiresIn: maxAge })
}
const handleError = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message === "Incorrect Email")
    errors.email = "That Email not Registred"
  if (err.message === "Incorrect Password")
    errors.password = "That Password was Incorrect"

  if (err.code === 11000) {
    errors.email = "Email is Already Registred";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

module.exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);
    const user = await UserModel.create({ name, email, password})
    res.status(201).json({ user: user._id, created: true })
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.json({ errors, created: false })
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await UserModel.login(email, password)
    const token = createToken(user._id)

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id, block: user.block , created: true, token })
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.json({ errors, created: false })
  }
};
module.exports.AdmLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const admin = await AdminModel.login(email, password)
    console.log(admin);
    const token = createAdminToken(admin._id)

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ admin: admin._id, created: true , token})
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.json({ errors, created: false })
  }
};
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await UserModel.find()
    res.status(200).json(user)
  } catch (err) {
    console.log(err);

  }
};
module.exports.deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOneAndDelete(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    console.log(err);

  }
};
module.exports.blockUser = async (req, res, next) => {
  try {
    const user = await  UserModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { block: true } })
    res.status(200).json(user)
  } catch (err) {
    console.log(err);

  }
};
module.exports.unBlockUser = async (req, res, next) => {
  try {
    const user = await  UserModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { block: false } })
    res.status(200).json(user)
  } catch (err) {
    console.log(err);
  }
};
module.exports.OneUser = async (req, res, next) => {
  console.log(req.params.id);
  try {
    
    const USER = await UserModel.findById(req.params.id)
    res.status(200).json(USER)
  } catch (err) {
    console.log(err);

  }
};
module.exports.editUser = async (req, res, next) => {
  // console.log(req.params.id);
  
  try {
    const { name,email } = req.body;
    // console.log(req.body);
    const user = await  UserModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { name: name , email:email}})
     res.status(200).json(user)
  } catch (err) {
    console.log(err);

  }
};