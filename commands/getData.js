module.exports = {
  category: "The Blockchain Adapter commands",
  description: "Get blockchain Data",
  guildOnly: true,
  callback: async ({ message, channel }) => {

    console.log("getData function starting...");
    channel.send("**Hi " + message.author.username + "!** I'm Starting... :grin:");
    
    return;
  }
}
