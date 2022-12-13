<h1>Here is the dapp repository link: </h1> https://github.com/N0E-P/NFT_detector_dapp

<h1>How to use The NFT Detector:</h1>
1. Add the bot to your discord server with a link

2. Write `!init` on any channel.

   > You need to be an administrator to use it.

3. Paste the ETH address of your NFT collection on the channel.

   > _You can find it on opensea, or on the page of your NFT collection in the blockchain explorer._

4. Wait while the bot save your address on our database.
   > It can take up to 5 minutes.
5. If you receive a message starting by: `Your NFT collection was added successfuly!`

   > It means that the initialisation succeded.

   But if you receive an error message, or nothing after 5 minutes:

   > It means that the initialisation failed. Verify your NFT address and restart the `!init` command.

6. Share the link of the dapp with the members of your server
   > _By connecting their metamask to the NFT Detector Dapp, the bot will be able to verify if they got some NFTs from your collection or not. And by the same time, it will link their wallet to their discord username._
   >
   > _This service is free. There is absolutely NO payement or transaction to do on the Dapp._
7. You've finish the setup! The bot will automatically add roles to the discord members who owns NFTs.

   Now, feel free to create text and vocal channels only for members with the `NFT owner` role.

<h1>How to start the bot:</h1>

1. Fork this repo.

2. Create a new moralis server

3. Add a .env with your discord bot token, your dapp server url and your dapp appId

4. Paste theses 3 commands in the shell:

   yarn

   moralis-admin-cli watch-cloud-folder --moralisApiKey ?????? --moralisApiSecret ?????? --moralisSubdomain ??????.usemoralis.com --autoSave 1 --moralisCloudfolder ??????

   yarn start

5. Try the bot on your server

**Thank you for using NFT detector!** :grin::thumbsup:

`Created by N0E-P`
