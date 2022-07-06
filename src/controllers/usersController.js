const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre and Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts and Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const bcryptjs = require("bcryptjs");
const User = require("../database/models/User.js");

const {validationResult} = require("express-validator");

const controller = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.json({message: error.message});
    }
  },
  getUser: async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findByPk(id);
      res.json();
    } catch (error) {
      res.json({message: error.message});
    }
  },
  register: (req, res) => {
    return res.render("users/register", {
      countries,
    });
  },
  processRegister: async (req, res) => {
    const inputFieldsValidation = validationResult(req);

    if (inputFieldsValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: inputFieldsValidation.mapped(),
        countries,
        oldData: req.body,
      });
    }

    let userAlreadyExists = await User.findByField("email", req.body.email);

    if (userAlreadyExists) {
      return res.render("users/register", {
        errors: {
          email: {
            msg: "This email is already registered.",
          },
        },
        countries,
        oldData: req.body,
      });
    }

    let userData = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      // store in avatar the image uploaded by the user or store default
      avatar: req.file?.filename || "!user-default.webp",
    };

    // store all input field values in user
    let user = await User.create(userData);

    return res.render("users/registerSuccess", {
      user,
    });
  },
  login: (req, res) => {
    return res.render("users/login");
  },

  processLogin: async (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      let passwordIsCorrect = bcryptjs.compareSync(req.body.password, userToLogin.password);

      if (passwordIsCorrect) {
        res.redirect('/users/profile');
      }

      return res.render("users/login", {
        errors: {
          password: {
            msg: "Password is incorrect. Please try again",
          },
        },
        oldData: req.body,
      });
    }

    return res.render("users/login", {
      errors: {
        email: {
          msg: "Email not registered",
        },
      },
      oldData: req.body,
    });
  },

  profile: (req, res) => {
    res.render('users/profile');
  }
};

module.exports = controller;
