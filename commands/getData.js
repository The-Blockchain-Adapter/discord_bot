const { ethers } = require("ethers");
const INFURA_KEY = process.env.INFURA_KEY
const CURRENT_NETWORK = process.env.CURRENT_NETWORK
const provider = new ethers.providers.JsonRpcProvider(`https://${CURRENT_NETWORK}.infura.io/v3/${INFURA_KEY}`);
//PAS TOUCHE AU DESSUS





const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)




//PAS TOUCHE EN DESSOUS

module.exports = {
  category: "The Blockchain Adapter commands",
  description: "Get blockchain Data",
  guildOnly: true,
  callback: async ({ message, channel }) => {

    console.log("getData function starting...");
    channel.send("**Hi " + message.author.username + "!** I'm Starting... :grin:");
    //PAS TOUCHE AU DESSUS




    
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()


    const msg = "Name: " +name+ " Symbol: "+symbol+" totalSupply: "+totalSupply;



    
    //PAS TOUCHE EN DESSOUS
    channel.send(msg);
    return;
  }
}

/*
  GET BALANCE :
  const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'
  const balanceOfAnEthAddress = ethers.utils.formatEther(await provider.getBalance(address));
  
  Ethers.js functions :
  https://docs.ethers.org/v5/api/providers/provider/

*/