const { ethers } = require("ethers");
const axios = require("axios");

module.exports = {
	async getData(data, interaction) {
		if (data.type == "view") {
			return await view(data);
		}
		if (data.type == "balance") {
			return await balance(data);
		}
		if (data.type == "api") {
			return await api(data);
		}
		if (data.type == "guild") {
			return await guild(data, interaction);
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

// Call a balance function
async function balance(data) {
	// Connect to Infura
	const INFURA_KEY = process.env.INFURA_KEY;
	const provider = new ethers.providers.JsonRpcProvider(
		`https://${data.blockchain}.infura.io/v3/${INFURA_KEY}`
	);

	// get & return the user Balance using ethers
	const balance = ethers.utils.formatEther(await provider.getBalance(data.address));
	return balance;
}

// Call an API
async function api(data) {
	// Call the API
	const response = await axios.get(data.url);
	var result = response.data;

	// Get the result from the path if there is one
	if (data.path == "/") {
		data.path = "";
	}
	if (data.path != "") {
		const path = data.path.split(".");
		for (var i = 0; i < path.length; i++) {
			result = result[path[i]];
		}
	}

	// Return an error if the API returned null or undefined
	if (result == null || result == undefined) {
		throw new Error("The API returned null or undefined.");
	}

	// Return the result
	return result;
}

// Get a value from the guild object
async function guild(data, interaction) {
	// Get the guild object
	var result = interaction.guild;

	// Get the result from the path if there is one
	if (data.path == "/") {
		data.path = "";
	}
	if (data.path != "") {
		const path = data.path.split(".");
		for (var i = 0; i < path.length; i++) {
			result = result[path[i]];
		}
	}

	// Return an error if the API returned null or undefined
	if (result == null || result == undefined) {
		throw new Error("The Path entered returned null or undefined.");
	}

	// Return the result
	return result;
}
