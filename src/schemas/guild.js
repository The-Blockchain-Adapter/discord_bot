const { Schema, model } = require("mongoose");
const viewFunctionSchema = require("../schemas/viewFunctions");

const requiredString = { type: String, required: true };

const guildSchema = new Schema({
	_id: Schema.Types.ObjectId,
	guildId: requiredString,
	guildName: requiredString,
	guildIcon: { type: String, required: false },
	viewFunctions: { type: [viewFunctionSchema], required: false },
});

module.exports = model("Guild", guildSchema, "guilds");
