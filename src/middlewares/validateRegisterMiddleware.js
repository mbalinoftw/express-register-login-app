const path = require("path");
const {body} = require("express-validator");

module.exports = [
  body("firstName").notEmpty().withMessage("Please enter your first name"),
  body("lastName").notEmpty().withMessage("Please enter your last name"),
  body("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("Please enter your password"),
  body("country").notEmpty().withMessage("Please select your country"),
  body("avatar").custom((value, {req}) => {
    // accesible from Multer (function "uploadFile")
    let acceptedFileExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    let file = req.file;
    if (typeof file === "undefined") {
      file = null;
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedFileExtensions.includes(fileExtension)) {
        throw new Error(`Please upload a valid image format: ${acceptedFileExtensions.join(", ")}`);
      }
    }
    return true;
  }),
];
