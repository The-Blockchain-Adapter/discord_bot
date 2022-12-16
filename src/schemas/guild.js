const { Schema, model } = require("mongoose");

const requiredString = { type: String, required: true };
const notRequiredString = { type: String, required: true };

const viewFunctionSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: requiredString,
	address: requiredString,
	blockchain: requiredString,
	abi: requiredString,
	needAdmin: { type: Boolean, required: true },
	valuesToEnter: { type: [String], required: false },
	textBefore: notRequiredString,
	textAfter: notRequiredString,
});

const guildSchema = new Schema({
	_id: Schema.Types.ObjectId,
	guildId: requiredString,
	guildName: requiredString,
	guildIcon: notRequiredString,
	viewFunctions: { type: [viewFunctionSchema], required: false },
});

module.exports = model("Guild", guildSchema, "guilds");
