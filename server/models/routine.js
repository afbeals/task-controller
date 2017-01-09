//require/use mongoose
var mongoose = require('mongoose');
//require/use schemas
var Schema = mongoose.Schema;
//require/use mongoose-validator
var validation = require('./data-validations.js');
//new schema
var routineSchema = new Schema(
{
	routine_name: {type: String, required: true, validation: validation.taskValidator, unique: true},
	total_duration: {type: String, required: true, validation: validation.durationValidator},
	_username: {type: Schema.Types.ObjectId, ref: 'User'},
	_task: [{type: Schema.Types.ObjectId, ref: 'Task'}],
	created_at: {type: Date, default: new Date}
})
// create model
var Routine = mongoose.model('Routine', routineSchema);