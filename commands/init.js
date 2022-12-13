// This file is used to run the command !init in discord, and to initialize the bot
const { Moralis } = require("moralis/node");

//Specificities of the command
module.exports = {
  category: "NFT Detector commands",
  description: "initialise the bot",
  permissions: ["ADMINISTRATOR"],
  guildOnly: true,
  callback: ({ message, channel }) => {
    //Start the script
    console.log("INIT function starting...");
    getCollectionAddress(message, channel);

    function getCollectionAddress(message, channel) {
      channel.send("**Hey " + message.author.username + "!  :grin:**");
      channel.send(
        "To initialize me, please send a message containing only the smart contract address of your NFT collection."
      );
      channel.send("_Example:_ `0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB`");

      //Make sure that the bot only take the answer from the admin
      const filter = (m) => {
        return m.author.id == message.author.id;
      };

      //Start the emoji collector
      const collector = channel.createMessageCollector({
        filter,
        max: 1,
        time: 1000 * 60,
      });

      // saying that he didn't answer fast enought, or continue.
      collector.on("end", (collected) => {
        if (collected.size === 0) {
          message.reply(
            "⚠️  You did not provide your NFT smart contract fast enough. Please write `!init` again to restart.  ⚠️"
          );
          return;
        }

        // get the address of the smart contract
        let address = message.content;
        collected.forEach((message) => {
          address = message.content;
        });

        //message
        console.log("The address " + address + " has been collected.");
        getBlockchain(message, channel, address);
      });
    }

    function getBlockchain(message, channel, address) {
      channel.send(
        "**Now, please click on the emoji representing the blockchain where your NFT collection is located.**"
      );
      message.channel
        .send({
          content:
            "🇪  Ethereum  |   🇧  Binance Smart Chain  |   🇵  Polygon / Matic  |   🇦  Avalanche  |   🇫  Fantom",
        })
        .then((mssg) => {
          mssg.react("🇪");
          mssg.react("🇧");
          mssg.react("🇵");
          mssg.react("🇦");
          mssg.react("🇫");
          mssg.react("🇷");

          //Make sure that the bot only take the answer from the admin
          const filter = (reaction, user) => {
            return user.id === message.author.id;
          };

          //Start the emoji collector and create the chosenEmoji variable, to store the result
          const collector = mssg.createReactionCollector({
            filter,
            max: 1,
            time: 60000,
          });

          // Save the chosen emoji into a variable
          let chosenEmoji;
          collector.on("collect", (reaction) => {
            chosenEmoji = reaction.emoji.name;
          });

          // saying that he didn't answer fast enough, or continue.
          collector.on("end", (collected) => {
            if (collected.size === 0) {
              message.reply(
                "⚠️  You did not chose the blockchain fast enough. Please write `!init` again to restart.  ⚠️"
              );
              return;
            }

            //convert the emoji into a blockchain name
            let blockchain;
            if (chosenEmoji === "🇪") {
              blockchain = "eth";
            } else if (chosenEmoji === "🇧") {
              blockchain = "bsc";
            } else if (chosenEmoji === "🇦") {
              blockchain = "avalanche";
            } else if (chosenEmoji === "🇫") {
              blockchain = "fantom";
            } else if (chosenEmoji === "🇵") {
              blockchain = "polygon";
            } else if (chosenEmoji === "🇷") {
              blockchain = "rinkeby";
            } else {
              message.reply(
                "⚠️  A wrong emoji has been choosen. Please write `!init` again to restart.  ⚠️"
              );
              return;
            }

            //message
            console.log("The blockchain " + blockchain + " has been chosen.");

            //Ending messages for the user
            channel.send(
              "**Thanks! The last thing you need to do is to tell your server's members to use the**  `!NFT`  **command.**"
            );
            channel.send(
              "You can also tell them to go directly on the NFT Detector dapp: *http://localhost:3000/* "
            );
            channel.send(
              "> _```Anybody who own an NFT need to connect his wallet to the dapp to be able to be verified. Try to use the command and the dapp yourself!```_"
            );
            channel.send(
              "**_You've finish my initialisation successfuly!  Thank you for using NFT detector!_**   :partying_face:"
            );

            //Start the repeat function and chose the time to repeat in minutes
            setInterval(addRoles, 60000 * 1, blockchain, address, message);
          });
        });
    }

    async function addRoles(blockchain, address, message) {
      //Start Moralis
      const serverUrl = process.env.SERVERURL;
      const appId = process.env.APPID;
      Moralis.start({ serverUrl, appId });

      //Get all server data
      const { guild } = message;

      //Get the role ID and verify if the server has a role named NFT Owner
      const role = guild.roles.cache.find((role) => {
        return role.name === "NFT Owner";
      });
      if (!role) {
        return console.log("ERROR: There is no NFT Owner role on this server");
      }

      //Get the owners list with all the metadata
      const allOwners = await getAllOwners(blockchain, address);

      //Get the list of all the users of the dapp
      const allUsers = await Moralis.Cloud.run("getAllUsers");

      //Get the list of all the members IDs
      const allMembersData = await guild.members.fetch();
      const allMembersID = allMembersData.map((member) => member.id);

      //loop to verify all the server members
      for (
        var currentMemberNumber = 0;
        currentMemberNumber < guild.memberCount;
        currentMemberNumber++
      ) {
        //Get all the infos of the current member
        var memberInfos = guild.members.cache.get(
          allMembersID[currentMemberNumber]
        );

        //Check this member
        await checkAMember(allOwners, allUsers, role, memberInfos);
      }

      //End of the script
      console.log("The roles have been check for every members in the server");
      return;
    }

    async function getAllOwners(blockchain, address) {
      var options = { chain: blockchain, address: address };
      var objectAllOwners = await Moralis.Web3API.token.getNFTOwners(options);
      var stringAllOwners = "";
      while (objectAllOwners.next) {
        objectAllOwners = await objectAllOwners.next();
        stringAllOwners = stringAllOwners + JSON.stringify(objectAllOwners);
      }
      var allOwners = stringAllOwners.toLowerCase();
      return allOwners;
    }

    async function checkAMember(allOwners, allUsers, role, memberInfos) {
      //Get the full memberName from memberinfos
      const memberName =
        memberInfos.user.username + "#" + memberInfos.user.discriminator;

      // Check if the discord member has register on the database
      const isOnDatabase = await isMemberNameOnDatabase(memberName, allUsers);

      if (isOnDatabase == "yes") {
        //The member register on the dapp.

        //Get the address of the user
        const userAddress = await Moralis.Cloud.run(
          "getUserAddress",
          (params = { memberName })
        );

        //Check if the user is an owner of the NFT
        const isOnCollection = await isUserAddressInCollection(
          userAddress,
          allOwners
        );

        if (isOnCollection == "yes") {
          //The member register on the dapp and is an NFT owner. So he get the role
          memberInfos.roles.add(role);
          console.log(memberName + " is an NFT Owner!");
          return;
        } else {
          //The member register on the dapp BUT isn't in the collection. So we remove the role if he have it
          if (memberInfos.roles.cache.get(role.id)) {
            memberInfos.roles.remove(role);
          }
          console.log(
            memberName + " register on the dapp BUT isn't in the collection."
          );
          return;
        }
      } else {
        //The member didn't register on the app. So we remove the role if he have it
        if (memberInfos.roles.cache.get(role.id)) {
          memberInfos.roles.remove(role);
        }
        console.log(memberName + " didn't register on the dapp.");
        return;
      }
    }

    async function isMemberNameOnDatabase(memberName, allUsers) {
      //Search for the userName in the the list of all the users
      //WARNING : Everything is put in lower case, in case of a user putt his username without the correct upper or lowercases. But it can cause problems if 2 users have the same username but with different cases.
      const lowerMemberName = memberName.toLowerCase();
      const wordFound = allUsers.indexOf(lowerMemberName);
      if (wordFound > -1) {
        return "yes";
      } else {
        return;
      }
    }

    async function isUserAddressInCollection(userAddress, allOwners) {
      //Check if the user is in the metadata of the NFT collection by looking for his address
      const lowerUserAddress = userAddress.toLowerCase();
      const wordFound = allOwners.indexOf(lowerUserAddress);
      if (wordFound > -1) {
        return "yes";
      } else {
        return;
      }
    }
  },
};
