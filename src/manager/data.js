const { ethers } = require("ethers");

module.exports = {
	async getData(data, inputs) {
		// Call the view function
		if (data.type == "view") {
			return await view(data, inputs);

			//Tell the user that this data function is not supported
		} else {
			await interaction.reply({
				content: `The ${data.type} data function is not supported yet.`,
				ephemeral: true,
			});
			return;
		}
	},
};

// Call a view function
async function view(data, inputs) {
	// Get the contract infos and create it
	const INFURA_KEY = process.env.INFURA_KEY;
	const provider = new ethers.providers.JsonRpcProvider(
		`https://${data.blockchain}.infura.io/v3/${INFURA_KEY}`
	);
	const abi = data.abi.replace(/\\/g, "");
	const contract = new ethers.Contract(data.address, abi, provider);

	// Call the function and return the result
	return await contract[data.name](...inputs);
}
