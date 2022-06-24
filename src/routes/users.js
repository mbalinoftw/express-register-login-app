const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/imgs/avatars");
  },
  filename: (req, file, cb) => {
    const {firstName, lastName} = req.body;
    const fileName = `${firstName}${lastName}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});
const uploadFile = multer({storage});

const { body } = require("express-validator");

const validations = [
  body('firstName').notEmpty().withMessage('Please enter your first name'),
  body('lastName').notEmpty().withMessage('Please enter your last name'),
  body('email')
    .notEmpty().withMessage('Please enter your email').bail()
    .isEmail().withMessage('Please enter a valid email address')
  ,
  body('password').notEmpty().withMessage('Please enter your password'),
  body('country').notEmpty().withMessage('Please select your country')
]

const usersController = require("../controllers/users");

router.get("/register", usersController.register);
router.post("/register", uploadFile.single("avatar"), validations, usersController.processRegister);
router.get("/login", usersController.login);

module.exports = router;
