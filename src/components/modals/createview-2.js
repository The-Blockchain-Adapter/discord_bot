const { Guild, ViewFunction } = require("../../schemas/guild");
const mongoose = require("mongoose");

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

		// Copier fonctions existantes
		const currentGuild = await Guild.findOneAndUpdate({ guildId: interaction.guild.id });
		const previousFunctions = currentGuild.viewFunctions.find();

		//Verifier si le nom de cette fonction n'existe pas déjà
		const foundFunction = await previousFunctions.find({
			name,
		});
		if (foundFunction != null) {
			await interaction.reply({
				content: `The function ${name} already exist. Modify or delete it if you want to change something.`,
			});
			return;
		}

		// GET THE VALUES TO ENTER
		// start at the first "(" from the line of the function, and end a the next ")"
		//look at a real abi to see

		//Assembler la nouvelle fonction
		const currentFunction = await new ViewFunction({
			_id: mongoose.Types.ObjectId(),
			name,
			address,
			blockchain,
			text,
			abi,
			valuesToEnter: { test1: "test2" }, //UPDATE
		});

		// Ajouter cette fonction a la liste
		const newFunctions = previousFunctions + currentFunction;

		// Sauvegarder
		await currentGuild.updateOne(
			{
				viewFunctions: previousFunctions,
			},
			{
				viewFunctions: newFunctions,
			}
		);

		await interaction.reply({
			content: `The function ${name} has been added successfully!\nYou can now call it using the command  /view ${name}`,
		});
	},
};
