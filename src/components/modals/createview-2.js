const Guild = require("../../schemas/guild");
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
		var previousFunctions;

		try {
			previousFunctions = currentGuild.viewFunctions.find();
			console.log("existing functions");

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

			// Si il n'y as pas déja de fonctions existantes :
		} catch (error) {
			previousFunctions = "";
			console.log("No existing functions");
		}

		// GET THE VALUES TO ENTER
		// start at the first "(" from the line of the function, and end a the next ")"
		//look at a real abi to see

		//Assembler la nouvelle fonction
		const currentFunction = {
			_id: mongoose.Types.ObjectId(),
			name,
			address,
			blockchain,
			text,
			abi,
			//valuesToEnter: [{ test1: "test2" }], //UPDATE
		};

		// Ajouter cette fonction a la liste
		const newFunctions = previousFunctions + currentFunction;
		console.log("NEW FUNCTION VARIABLE:");
		console.log(JSON.stringify(newFunctions));
		console.log("PREVIOUS FUNCTION VARIABLE:");
		console.log(JSON.stringify(previousFunctions));
		console.log("CURRENT FUNCTION VARIABLE:");
		console.log(JSON.stringify(currentFunction));

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
			content: `The function ${name} has been added successfully!\nYou can now call it using the command:\n/view ${name}`,
		});
	},
};
