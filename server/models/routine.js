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
	//save_routine: {type: Boolean, required: false},
	_username: {type: Schema.Types.ObjectId, ref: 'user'},
	_task: [{type: Schema.Types.ObjectId, ref: 'tasks'}],
	created_at: {type: Date, default: new Date}
})
// create model
var Routine = mongoose.model('Routine', routineSchema);