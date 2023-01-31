const { ethers } = require("ethers");

module.exports = {
	async getData(data) {
		// Call the view function
		if (data.type == "view") {
			return await view(data);
		}
		if (data.type == "balance") {
			return await balance(data);
		}
	},
};

// Call a view function
async function view(data) {
	// Get the contract infos and create it
	const INFURA_KEY = process.env.INFURA_KEY;
	const provider = new ethers.providers.JsonRpcProvider(
		`https://${data.blockchain}.infura.io/v3/${INFURA_KEY}`
	);
	const abi = data.abi.replace(/\\/g, "");
	const contract = new ethers.Contract(data.address, abi, provider);

	// Call the function and return the result
	return await contract[data.name](...data.inputs);
}

/*
// Call a view function
async function view(data) {




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
*/
