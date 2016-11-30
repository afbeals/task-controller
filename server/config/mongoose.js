//import mongoose
var mongoose = require('mongoose');
//file structure
var fs = require('fs');
//file path
var path = require('path');
//create database
mongoose.connect('mongodb://localhost/Stracker_App');
//locate models
var models_path = path.join(__dirname, './../models');
//load all models
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) 
  {
    require(models_path + '/' + file);
  }
});