const { ethers } = require("ethers");
const INFURA_KEY = process.env.INFURA_KEY
const CURRENT_NETWORK = process.env.CURRENT_NETWORK
const provider = new ethers.providers.JsonRpcProvider(`https://${CURRENT_NETWORK}.infura.io/v3/${INFURA_KEY}`);

const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

module.exports = {
  category: "The Blockchain Adapter commands",
  description: "Get blockchain Data",
  guildOnly: true,
  callback: async ({ message, channel }) => {

    console.log("getData function starting...");
    channel.send("**Hi " + message.author.username + "!** I'm Starting... :grin:");

    const balance = await provider.getBalance(address)
    const msg = ethers.utils.formatEther(balance);
    channel.send(msg);

    return;
  }
}
