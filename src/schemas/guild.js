const { Schema, model } = require("mongoose");

const requiredString = { type: String, required: true };
const requiredBoolean = { type: Boolean, required: true };

const dataSchema = new Schema({
	type: requiredString,
	functionName: String,
	address: String,
	blockchain: String,
	abi: String,
	inputs: [String],
	output: String,
});

const actionSchema = new Schema({
	type: requiredString,
	text: String,
});

const commandSchema = new Schema({
	name: requiredString,
	onlyAdmin: requiredBoolean,
	modalTitle: String,
	modalInputs: [String],
	modalOutputs: [String],
	data: [dataSchema],
	action: { type: [actionSchema], required: true },
});

const guildSchema = new Schema({
	_id: Schema.Types.ObjectId,
	guildId: requiredString,
	guildName: requiredString,
	guildIcon: String,
	commands: [commandSchema],
});

module.exports = model("Guild", guildSchema, "guilds");
