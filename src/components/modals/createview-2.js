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

		// GET THE VALUES TO ENTER
		// start at the first "(" from the line of the function, and end a the next ")"
		//look at a real abi to see

		// Assemble and add the new fonction to the array
		const newFunction = {
			name,
			address,
			blockchain,
			text,
			abi,
			valuesToEnter: [{ test1: "test2" }], //UPDATE
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
		await interaction.reply({
			content: `The function ${name} has been added successfully!\nYou can now call it using the command:\n/view ${name}`,
		});
	},
};
