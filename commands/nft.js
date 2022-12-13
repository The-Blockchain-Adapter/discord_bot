// This file is used to run the command !NFT in discord, To get the link of the dapp with a beautiful button
const { MessageActionRow, MessageButton } = require("discord.js");

//Specificities of the command
module.exports = {
  category: "NFT Detector commands",
  description: "Show the button to connect Metamask",
  guildOnly: true,
  callback: async ({ message, channel }) => {
    console.log("NFT function starting...");

    //Button creation
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL("http://localhost:3001/")
        .setLabel(" Go to the NFT Detector Dapp ")
        .setStyle("LINK")
    );

    //context messages
    channel.send("**Hi " + message.author.username + "!**  :grin:");
    channel.send(
      "**If you have one or more NFTs, you can get access to private text and voice channels on this server.**"
    );
    channel.send(
      "To do so, you just need to connect your wallet to the NFT Detector Dapp by clicking the following button."
    );
    await channel.send({
      content:
        "> _```It will allow me to verify if you really own an NFT, without doing any payement or transaction. By the way, I will never DM you, or ask you for your private keys.```_",
      components: [row],
    });
    return;
  },
};
