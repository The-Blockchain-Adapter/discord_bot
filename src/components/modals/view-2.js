const Guild = require("../../schemas/guild");
const { ethers } = require("ethers");

// Once the user enter the values in the createview modal, this script runs
module.exports = {
	data: {
		name: `view-2`,
	},
	async execute(interaction, client) {
		//Get all the currentfunction infos from the database
		const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
		const viewFunctions = guildProfile.viewFunctions;
		var currentFunction = null;
		for (i = 0; i < viewFunctions.length; i++) {
			if (viewFunctions[i].name == interaction.fields.getTextInputValue("functionName")) {
				currentFunction = viewFunctions[i];
			}
		}
		if (!currentFunction) {
			await interaction.reply({
				content: "Do not change the `functionName` value.",
				ephemeral: true,
			});
			return;
		}

		// Get the values entered in the modal
		var inputs = [];
		for (var i = 0; i < currentFunction.valuesToEnter.length && i < 4; i++) {
			inputs.push(interaction.fields.getTextInputValue(i + " "));
		}

		// Connect to the blockchain
		const INFURA_KEY = process.env.INFURA_KEY;
		const provider = new ethers.providers.JsonRpcProvider(
			`https://${currentFunction.blockchain}.infura.io/v3/${INFURA_KEY}`
		);
		const abi = currentFunction.abi.replace(/\\/g, "");

		// Call the function
		const contract = new ethers.Contract(currentFunction.address, abi, provider);
		const data = await contract[currentFunction.name](...inputs);

		//Send the result
		const text = currentFunction.text;
		const content =
			text.substring(0, text.indexOf("#")) +
			data.toString() +
			text.substring(text.lastIndexOf("#") + 1, text.length);
		await interaction.reply({ content });
		return;
	},
};
