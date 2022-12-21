const { Schema } = require("mongoose");

const requiredString = { type: String, required: true };

const viewFunctionSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: requiredString,
	address: requiredString,
	blockchain: requiredString,
	text: requiredString,
	abi: requiredString,
	valuesToEnter: { type: [String], required: false },
});

module.exports = viewFunctionSchema;
