const { ethers } = require("ethers");
const INFURA_KEY = process.env.INFURA_KEY

module.exports = {
    data: {
        name: `balance-message`
    },
    async execute(interaction, client){

        const address = interaction.fields.getTextInputValue("AddressInput")
        const blockchain = interaction.fields.getTextInputValue("BlockchainInput")
        
        const provider = new ethers.providers.JsonRpcProvider(`https://${blockchain}.infura.io/v3/${INFURA_KEY}`);
        const balance = ethers.utils.formatEther(await provider.getBalance(address));

        await interaction.reply({
            content: `${address} has ${balance} ETH on Ethereum ${blockchain}`
        });
    },
};