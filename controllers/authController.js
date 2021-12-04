const User = require("../models/user");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
  let error = { err: true, msg: "" };

  //incorrect email
  if (err.message === "Incorrect email") {
    error.msg = "Entered email is not registered";
  }

  //incorrect password
  if (err.message === "Incorrect Password") {
    error.msg = "Entered password is incorrect";
  }

  if (err._message === "User validation failed") {
    const errObjKey = Object.keys(err.errors)[0];
    console.log(err.errors[errObjKey].properties);
    error.msg = err.errors[errObjKey].properties.message;
  }

  //duplicate error code
  if (err.code === 11000) {
    error.msg = "Entered email is already registered";
    return error;
  }

  return error;
};

//Creating JWT Token
const maxAge = 2 * 24 * 60 * 60; //token will expire in 2 days
const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

//  Signup
module.exports.post_signup = async function (req, res) {
  console.log(req.body);
  try {
    const { name, phone_number, email, password } = req.body;

    // Validate user input
    if (!(email && password && name && phone_number)) {
      return res.status(400).json({ err: true, msg: "All input is required" });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .json({ err: true, msg: "User Already Exist. Please Login" });
    }

    const phoneNumber = await User.findOne({ phone_number });

    if (phoneNumber) {
      return res.status(409).json({
        err: true,
        msg: "Phone Number Already Exist. Please give another number",
      });
    }

    const user = await User.create({ name, phone_number, email, password });
    const token = createToken(user._id, email);
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json(err);
  }
};

// Login
module.exports.post_login = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ err: true, msg: "All input is required" });
    }

    const user = await User.login(email, password);
    const token = createToken(user._id, email);
    user.token = token;
    res.status(201).send(user);
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json(err);
  }
};

//Log out
module.exports.get_logout = function (req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  //redirect to home page
  //...
};
