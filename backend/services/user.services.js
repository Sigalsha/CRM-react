const User = require("../models/UserModel");

exports.findUserByEmail = async function ({ email }) {
  // check for existing user when trying to create a new user
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.log("err from service, while trying to find user");
    return (err = "Error while finding user or user does not exist");
  }
};

exports.findUserById = async function (id) {
  // check for existing user when trying to get user data
  try {
    return await User.findById(id).select("-password");
  } catch (err) {
    console.log("err from service, while trying to find user");
    return (err = "Error while finding user or user does not exist");
  }
};

exports.addNewUser = async function ({ name, email, hashedPassword }) {
  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    newUser.save((err) => {
      console.log("err from service, while trying to find user");
      if (err) return err;
    });
    return newClient;
  } catch (err) {
    console.log("err from service, while trying to add a new user");
    return (err = "Error while trying to save new user to db");
  }
};
