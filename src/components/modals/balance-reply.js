const { ethers } = require("ethers");
const INFURA_KEY = process.env.INFURA_KEY;

// Once the user enter the values in the balance modal, this script runs
module.exports = {
	data: {
		name: `balance-reply`,
	},
	async execute(interaction, client) {
		// Get the values entered in the modal
		const address = interaction.fields.getTextInputValue("AddressInput");
		const blockchain = interaction.fields.getTextInputValue("BlockchainInput");

		// Connect to Infura & get the user Balance using ethers
		const provider = new ethers.providers.JsonRpcProvider(
			`https://${blockchain}.infura.io/v3/${INFURA_KEY}`
		);
		const balance = ethers.utils.formatEther(await provider.getBalance(address));

		// Reply to the user on discord
		await interaction.reply({
			content: `${address} has ${balance} ETH on Ethereum ${blockchain}`,
		});
	},
};
