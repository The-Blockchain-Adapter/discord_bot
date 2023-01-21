const Guild = require("../../schemas/guild");
const { scriptManager } = require("../../managers/scriptManager");

// Once the user enter the values in the script modal, this script runs
module.exports = {
	data: {
		name: `script-2`,
	},
	async execute(interaction, client) {
		//Get all the infos from the database
		const guild = await Guild.findOne({ discordId: interaction.guild.id });

		//Get the command name from the modal
		interaction.customId = interaction.customId.replace("script-", "");
		const command = guild.scripts.find((script) => script.trigger.name == interaction.customId);

		// Get the values entered in the modal
		var inputs = [];
		for (var i = 0; i < command.trigger.modalInputs.length && i < 4; i++) {
			inputs.push(interaction.fields.getTextInputValue(command.trigger.modalOutputs[i]));
		}

		// Call the scriptManager with input
		await scriptManager(interaction, client, guild, command, inputs);
		return;
	},
};
