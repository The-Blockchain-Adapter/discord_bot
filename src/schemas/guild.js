const { Schema, model } = require("mongoose");

const requiredString = { type: String, required: true };

const triggerSchema = new Schema({
	type: requiredString,
	name: String,
	onlyAdmin: Boolean,
	title: String,
	inputs: [String],
	outputs: [String],
});

const dataSchema = new Schema({
	type: requiredString,
	name: String,
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

const scriptSchema = new Schema({
	trigger: { type: triggerSchema, required: true },
	data: [dataSchema],
	action: { type: [actionSchema], required: true },
});

const guildSchema = new Schema({
	_id: Schema.Types.ObjectId,
	discordId: requiredString,
	name: requiredString,
	icon: String,
	scripts: [scriptSchema],
});

module.exports = model("Guild", guildSchema, "guilds");
