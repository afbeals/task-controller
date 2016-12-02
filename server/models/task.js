//require/use mongoose
var mongoose = require('mongoose');
//require/use schemas
var Schema = mongoose.Schema;
//require/use mongoose-validator
var validation = require('./data-validations.js');
//new schema
var taskSchema = new Schema(
{
	task_name: {type: String, required: true, validation: validation.taskValidator},
	duration: {type: Number, required: true, validation: validation.durationValidator},
	location: {type: String, required: true, validation: validation.locationValidator},
	_routine: [{type: Schema.Types.ObjectId, ref: 'routine'}],
	created_at: {type: Date, default: new Date}
})
// create model
var Task = mongoose.model('Task', taskSchema);