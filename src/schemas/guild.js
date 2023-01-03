const { Schema, model } = require("mongoose");

const requiredString = { type: String, required: true };

const inputSchema = new Schema({
	name: requiredString,
	type: requiredString,
});

const viewFunctionSchema = new Schema({
	name: requiredString,
	address: requiredString,
	blockchain: requiredString,
	text: requiredString,
	abi: requiredString,
	valuesToEnter: { type: [inputSchema], required: false },
});

const guildSchema = new Schema({
	_id: Schema.Types.ObjectId,
	guildId: requiredString,
	guildName: requiredString,
	guildIcon: { type: String, required: false },
	viewFunctions: { type: [viewFunctionSchema], required: false },
});

module.exports = model("Guild", guildSchema, "guilds");
