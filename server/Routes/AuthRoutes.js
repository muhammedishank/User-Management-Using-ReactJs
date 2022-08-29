const { signup, login,AdmLogin ,getUser,deleteUser,blockUser,unBlockUser,OneUser,editUser} = require("../Controllers/AuthControllers");
const router = require("express").Router();
const { checkUser} = require('../Middlewares/authMiddleware')

router.post("/",checkUser)
router.post("/signup",signup);
router.post("/login",login);
router.post("/AdmLogin",AdmLogin);
router.post("/getUser",getUser);
router.delete("/deleteUser/:id",deleteUser);
router.put("/blockUser/:id",blockUser);
router.put("/unBlockUser/:id",unBlockUser);
router.post("/getOneUser/:id",OneUser); 
router.put("/editUser/:id",editUser);
module.exports = router;