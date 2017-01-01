//require/use mongoose
var mongoose = require('mongoose');
//require/use schemas
var Schema = mongoose.Schema;
//require/use mongoose-validator
var validation = require('./data-validations.js');
//new schema
var userSchema = new Schema(
{
	first_name: {type: String, required: true, validation: validation.nameValidator},
	last_name: {type: String, required: true, validation: validation.nameValidator},
	email: {type: String, required: true, validation: validation.emailValidator, unique: true},
	username: {type: String, required: true, validation: validation.usernameValidator, unique: true},
	home: {type: String, required: true, validation: validation.homeValidator},
	password: {type: String, required: true, minlength: 5, maxlength: 25},
	created_at: {type: Date, default: new Date},

})
// create model
var user = mongoose.model('User', userSchema);