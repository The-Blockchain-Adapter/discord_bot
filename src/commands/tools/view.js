const {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");
const Guild = require("../../schemas/guild");
const { ethers } = require("ethers");

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

	// Get the function names to autocomplete the command
	async autocomplete(interaction, client) {
		// Verify if this guild is on the database
		const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
		if (!guildProfile) {
			return;
		}

		// Get the list of all the viewfonctions
		const viewFunctions = guildProfile.viewFunctions;
		var choices = [viewFunctions.length];
		for (i = 0; i < viewFunctions.length; i++) {
			choices[i] = viewFunctions[i].name;
		}

		// Filter the choices based on the user input
		const focusedValue = interaction.options.getFocused();
		const filtered = choices.filter((choice) => choice.startsWith(focusedValue));
		await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
	},

	async execute(interaction, client) {
		// Verify if this guild is on the database
		const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
		if (!guildProfile) {
			await interaction.reply({
				content: `Call the /init command before using other commands on the server.`,
				ephemeral: true,
			});
			return;
		}

		// Verify if this function is registered on the server
		const viewFunctions = guildProfile.viewFunctions;
		var currentFunction = null;
		for (i = 0; i < viewFunctions.length; i++) {
			if (viewFunctions[i].name == interaction.options.getString("function")) {
				currentFunction = viewFunctions[i];
			}
		}
		if (!currentFunction) {
			await interaction.reply({
				content: `This function is not registered on the server.`,
				ephemeral: true,
			});
			return;
		}

		// Create the modal to get the inputs of the function
		if (currentFunction.valuesToEnter.length > 0) {
			const modal = new ModalBuilder()
				.setCustomId(`view-2`)
				.setTitle(`Call the ${currentFunction.name} view function`);

			//Enter the function name in the modal to call it later
			const functionName = new TextInputBuilder()
				.setCustomId("functionName")
				.setLabel(`Function name (Do not change this value)`)
				.setPlaceholder(currentFunction.name)
				.setValue(currentFunction.name)
				.setRequired(true)
				.setStyle(TextInputStyle.Short);
			modal.addComponents(new ActionRowBuilder().addComponents(functionName));

			// Add values to enter in the modal
			for (
				var inputNumber = 0;
				inputNumber < currentFunction.valuesToEnter.length && inputNumber < 4;
				inputNumber++
			) {
				const input = new TextInputBuilder()
					.setCustomId(inputNumber + " ")
					.setLabel(
						`${currentFunction.valuesToEnter[inputNumber].name} (type: ${currentFunction.valuesToEnter[inputNumber].type})`
					)
					.setRequired(true)
					.setStyle(TextInputStyle.Short);

				//Add this component to the modal
				modal.addComponents(new ActionRowBuilder().addComponents(input));
			}

			//Show the modal
			await interaction.showModal(modal);
			return;

			// Call the function without any input
		} else {
			// Connect to the blockchain
			const INFURA_KEY = process.env.INFURA_KEY;
			const provider = new ethers.providers.JsonRpcProvider(
				`https://${currentFunction.blockchain}.infura.io/v3/${INFURA_KEY}`
			);
			const abi = currentFunction.abi.replace(/\\/g, "");

			// Call the function
			const contract = new ethers.Contract(currentFunction.address, abi, provider);
			const data = await contract[currentFunction.name]();

			//Send the result
			const text = currentFunction.text;
			const content =
				text.substring(0, text.indexOf("#")) +
				data.toString() +
				text.substring(text.lastIndexOf("#") + 1, text.length);
			await interaction.reply({ content });
			return;
		}
	},
};
