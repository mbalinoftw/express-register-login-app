const express = require("express");
const router = express.Router();

const uploadFile = require("../middlewares/multerMiddleware.js")
const validateRegister = require("../middlewares/validateRegisterMiddleware.js")
const { register, processRegister, login, processLogin, profile } = require("../controllers/usersController");


router.get("/register", register);
router.post("/register", uploadFile.single("avatar"), validateRegister, processRegister);
router.get("/login", login);
router.post("/login", processLogin);
router.get("/profile", profile);

module.exports = router;
