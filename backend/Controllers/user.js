
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Booking = require('../Models/Booking')
const User = require("../Models/User");
const config = require('../config/config');

//add
exports.signup = async (req, res, next) => {

  const email = req.body.email;
  const userName = req.body.userName;
  const name = req.body.name;
  const password = req.body.password;
  const type = req.body.type;
  try {
    const checkuser = await User.findOne({ email: email });
    if (checkuser) {
      const error = new Error("Email exsisted");
      error.statusCode = 500;
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPw,
      userName: userName,
      name: name,
      type: type
    });
    const result = await user.save();
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


//update
exports.update = async (req, res, next) => {

  let userID = req.params.userId;
  const { name, email, userName, password } = req.body;
  const hashedPw = await bcrypt.hash(password, 12);

  const updateUser = {
    name,
    email,
    userName,
    password: hashedPw,
  };

  const update = await User.findByIdAndUpdate(userID, updateUser)
    .then(() => {
      res.status(200).send({ status: 'User Updated' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'Error with updating data', error: "error" });
    });
};


//get one user 
exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "user fetched.", user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


//login check validatons
exports.login = async (req, res, next) => {
  //const email = req.body.email;
  let filter
  if (req.body.email) {
    if (req.body.type) {
      filter = {
        email: req.body.email,
        type: req.body.type
      }
    }
    else {
      filter = {
        email: req.body.email
      }
    }

  }
  else {
    filter = { userName: req.body.userName }
  }



  const password = req.body.password;
  try {
    const user = await User.findOne(filter, { password: 0 });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        userId: user._id.toString(),
      },
      config.jwtSecret,
      { expiresIn: "1h" },
    );
    res.status(200).json({ token: token, user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getallusers = async (req, res) => {
  try {
    const nusers = await User.find({ type: "" }, { password: 0 })
    const ausers = await User.find({ type: "ma" }, { password: 0 })
    const users = {
      nusers,
      ausers
    }
    res.json(users)

  } catch (error) {
    res.status(400).json({
      error: String(err)

    })
  }



}

exports.deleteuser = async (req, res) => {
  let delid = req.params.id;
  try {
    await User.findByIdAndDelete(delid);
    await Booking.deleteMany({ uid: delid })
  } catch (err) {
    res.status(500).send({ status: "error in deleting data", error: err.message });
  }


}