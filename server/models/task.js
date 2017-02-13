//require/use mongoose
var mongoose = require('mongoose'),

//require/use schemas
	Schema = mongoose.Schema,

//require/use mongoose-validator
	validation = require('./data-validations.js'),

//new schema
	taskSchema = new Schema(
	{
		task_name: {type: String, required: true, validation: validation.taskValidator},
		task_length: {type:Number, required: true, validation: validation.durationValidator},
		task_location: {type: String, required: true, validation: validation.locationValidator},
		order: {type: Number, required: true},
		_username:{type: Schema.Types.ObjectId, ref: 'User'},
		_routine: [{type: Schema.Types.ObjectId, ref: 'Routine'}],
		created_at: {type: Date, default: new Date}
	}),
	
// create model
	Task = mongoose.model('Task', taskSchema);


