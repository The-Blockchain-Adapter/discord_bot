const {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");

const database = require("../../../mess/databaseExample.json");

// Command details
module.exports = {
	data: new SlashCommandBuilder()
		.setName("view")
		.setDescription("Call a view function")
		.addStringOption((option) =>
			option
				.setName("function")
				.setDescription("Select the function to call")
				.setAutocomplete(true)
				.setRequired(true)
		),

	// Execute a command with values to enter
	async autocomplete(interaction, client) {
		const focusedValue = interaction.options.getFocused();

		const guildId = interaction.guildId;
		const allTheViewFunctions = database[guildId].viewFunction;

		//CHopper la liste des viewfonctions
		var choices = [allTheViewFunctions.length];
		for (i = 0; i < allTheViewFunctions.length; i++) {
			choices[i] = allTheViewFunctions[i].name;
		}

		//= 4; //interaction.guild.id; //database[interaction.guild.id]//[("nft", "token", "metaverse")]; //BESOIN D'AJOUTER UN NOMBRE INFINI DE FONCTIONS / RETIRER CETTE LISTE DE LA DATABASE

		const filtered = choices.filter((choice) => choice.startsWith(focusedValue));
		await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
	},

	async execute(interaction, client) {
		const choosenFunction = interaction.options.getString("function"); //This gives the function the user want to call

		//BESOIN D'AJOUTER UN NOMBRE INFINI DE FONCTIONS / RETIRER CETTE LISTE DE LA DATABASE
		//const { functionsPossibilites } = require("../../functionExamples.json");

		//Check what is the function called / REPLACE THAT BY THE DIRECT MODAL CREATION
		for (var i = 0; i < functionsPossibilites.length; i++) {
			if (choosenFunction == functionsPossibilites[i][0]) {
				// Create the modal
				const modal = new ModalBuilder()
					.setCustomId(choosenFunction)
					.setTitle(`Call the ${choosenFunction} view function`);

				// Add values to enter in the modal
				for (var component = 0; component < 2; component++) {
					const input = new TextInputBuilder()
						.setCustomId(functionsPossibilites[component][1])
						.setLabel(`Enter the ${functionsPossibilites[component][1]}`)
						.setRequired(true)
						.setStyle(TextInputStyle.Short);

					//Add this component to the modal
					modal.addComponents(new ActionRowBuilder().addComponents(input));
				}

				//Show the modal
				await interaction.showModal(modal);
			}
		}
	},
};
