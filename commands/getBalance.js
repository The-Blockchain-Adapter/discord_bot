const { ethers } = require("ethers");
const INFURA_KEY = process.env.INFURA_KEY

//Specificities of the command
module.exports = {
  category: "The Blockchain Adapter commands",
  description: "Get Balance of an ETH Address",
  guildOnly: true,
  callback: async ({ message, channel }) => {
    console.log("The !getBalance function is starting...");
    
    //Extract the address & the network from the message
    const msg = JSON.stringify(message.cleanContent)
    const address = msg.substring(msg.indexOf(" ")+1, msg.lastIndexOf(" "));
    const network = msg.substring(msg.lastIndexOf(" ")+1, msg.lastIndexOf('"'));

    //Make sure the Address is legit
    if (address.length != 42 && !address.includes(".eth")){ //This will fail with wrong ENS addresses
      channel.send("Command failed: The entered address is not the right size.")
      return
    }

    //Make sure the Network is legit
    const authorizedNetworks = ["mainnet", "goerli", "sepolia", "palm-mainnet", "palm-testnet", "avalanche-mainnet", "avalanche-fuji", "near-mainnet", "near-testnet", "starknet-mainnet", "starknet-goerli", "celo-mainnet", "celo-alfajores", "aurora-mainnet", "aurora-testnet"]
    if (!authorizedNetworks.includes(network)){
      channel.send("Command failed: The entered network should be one of theses:");
      channel.send("```mainnet, goerli, sepolia, palm-mainnet, palm-testnet, avalanche-mainnet, avalanche-fuji, near-mainnet, near-testnet, starknet-mainnet, starknet-goerli, celo-mainnet, celo-alfajores, aurora-mainnet, aurora-testnet```")
      return
    }

    //Get the balance
    const provider = new ethers.providers.JsonRpcProvider(`https://${network}.infura.io/v3/${INFURA_KEY}`);
    const balance = ethers.utils.formatEther(await provider.getBalance(address));

    //End the function
    channel.send(address + " has " + balance +" ETH on " + network);
    return;
  }
}