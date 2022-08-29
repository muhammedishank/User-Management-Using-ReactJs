
// const User = require("../Models/UserModel")
// const jwt = require("jsonwebtoken")
// // const Admin = require("../Models/AminModel")

// module.exports.checkUser = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(
//             token,
//             "ishan super secret key",
//             async (err, decodedToken) => {
//                 if (err) {
//                     res.json({ status: false });
//                     next();
//                 } else {
//                     const user = await User.findById(decodedToken.id);
//                     if (!user.block) res.json({ status: true, user: user.email });
//                     else res.json({ status: false });
//                     next();
//                 }
//             }
//         );
//     } else {
//         res.json({ status: false });
//         next();
//     }
// };

const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "ishan super secret key",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if(user){
          if (!user.block) res.json({ status: true, user: user.email, name:user.name });
          else res.json({ status: false, block: user.block });
          next();
          }
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};
