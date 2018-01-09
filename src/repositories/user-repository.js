'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = async(data) => {
  const res = await User.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.create = async(data) => {
  var user = new User(data);
  await user
  .save();
}
