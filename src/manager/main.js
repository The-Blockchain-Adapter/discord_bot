module.exports = {
	async scriptManager(interaction, client, guild, command, inputs) {
		console.log(command.trigger.name);
	},
};

// const { ethers } = require("ethers");

/*
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
    */
