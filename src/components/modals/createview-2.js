const Guild = require("../../schemas/guild");

// Once the user enter the values in the createview modal, this script runs
module.exports = {
	data: {
		name: `createview-2`,
	},
	async execute(interaction, client) {
		// Get the values entered in the modal
		const name = interaction.fields.getTextInputValue("NameInput");
		const address = interaction.fields.getTextInputValue("AddressInput");
		const blockchain = interaction.fields.getTextInputValue("BlockchainInput");
		const text = interaction.fields.getTextInputValue("TextInput");
		const abi = interaction.fields.getTextInputValue("AbiInput");

		// Copy the current array of functions
		const currentGuild = await Guild.findOne({ guildId: interaction.guild.id });
		const viewFunctions = currentGuild.viewFunctions;

		//Check if this function name already exist
		if (viewFunctions.find((element) => element.name === name)) {
			await interaction.reply({
				content: `The function ${name} already exist. Modify or delete it if you want to change something.`,
			});
			return;
		}

		// Get the inputs of the function
		var valuesToEnter = [];
		const cleanABI = abi.replace(/\\/g, "");
		const parsedABI = JSON.parse(cleanABI);
		//Loop through all the ABI to find the right function
		for (i = 0; i < parsedABI.length; i++) {
			if (parsedABI[i].name == name) {
				//Get the inputs
				const inputs = parsedABI[i].inputs;
				//Loop through all the inputs to get the name and type
				for (j = 0; j < inputs.length; j++) {
					const inputName = inputs[j].name;
					const inputType = inputs[j].type;
					//Add the input to the valuesToEnter array
					valuesToEnter.push({ name: inputName, type: inputType });
				}
			}
		}

		// Assemble and add the new fonction to the array
		const newFunction = {
			name,
			address,
			blockchain,
			text,
			abi,
			valuesToEnter,
		};
		viewFunctions.push(newFunction);

		// Save the new array of functions
		await Guild.updateOne(
			{
				guildId: interaction.guild.id,
			},
			{
				viewFunctions,
			}
		);

		// Send a message to the user
		const content =
			`The function ${name} has been added successfully!\nYou can now call it using the command:\n` +
			"`/view function:" +
			name +
			"`";
		await interaction.reply({
			content,
		});
	},
};
