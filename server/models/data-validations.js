var validate = require('mongoose-validator');
//set validations

module.exports = {
	nameValidator : [
		validate({
			validator: 'isLength',
			arguments: [3,50],
			message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
		}),
		validate({
			validator: 'isAlphanumeric',
			passIfEmpty: true,
			message: 'Name should contain alpha-numeric characters only'
		})
	],
	emailValidator : [
		validate({
			validator: 'isEmail',
			message: 'Please enter a valid email'
		})
	],
	passwordValidator : [
		validate({

		})
	],
	taskValidator : [
		validate({
			validator: 'isAlphanumeric'j,
			passIfEmpty: true,
			message: 'Task name should contain alpha-numeric characters only'
		})
	],
	durationValidator : [
		validate({
			validator: 'isNumeric',
			passIfEmpty: false,
			message: 'Please enter numeric characters only'
		})
	],
	locationValidator : [
		validate({
			validator: 'isLength',
			arguments: [5,75],
			message: 'Location should be between {ARGS[0]} and {ARGS[1]} characters'
		})
	]
}
