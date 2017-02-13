//import mongoose
var mongoose = require('mongoose'),
//file structure
	fs = require('fs'),
//file path
	path = require('path');
//create database
mongoose.connect('mongodb://localhost/Task_controller');
//locate models
var models_path = path.join(__dirname, './../models');
//load all models
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) 
  {
    require(models_path + '/' + file);
  }
});