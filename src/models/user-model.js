'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  account:{
    type:Number,
    required:true
  },
  token:{
    type:String,
    require:false
  }
});


module.exports = mongoose.model("User", schema);
