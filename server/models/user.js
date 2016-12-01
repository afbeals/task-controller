//require/use mongoose
var mongoose = require('mongoose');
//require/use schemas
var schema = mongoose.schema;
//require/use mongoose-validator
var validation = require('./data-validations.js');
//new schema
var userSchema = new Schema(
{
	first_name: {type: String, required: true, validation.nameValidator: nameValidator},
	last_name: {type: String, required: true, validation.nameValidator: nameValidator},
	email: String,
})