# This is all the mess I don't want to throw from other files

## interactionCreate.js

```javascript
else if(interaction.isButton()){
    const {buttons} = client;
    const {customId} = interaction;
    const button = buttons.get(customId);
    if (!button) return new Error('There is no code for this button.');
    try {
        await button.execute(interaction, client);
    }catch (error){
        console.error(error);
    }

} else if (interaction.isStringSelectMenu()){
    const {selectMenus} = client;
    const {customId} = interaction;
    const menu = selectMenus.get(customId);
    if (!menu) return new Error('There is no code for this select menu.');
    try {
        await menu.execute(interaction, client);
    }catch(error){
        console.error(error);
    }

}
```

## ping.js (test command)

```javascript
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Return my ping!"),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
			message.createdTimestamp - interaction.createdTimestamp
		}`;
		await interaction.editReply({
			content: newMessage,
		});
	},
};
```

## handleComponents.js

```javascript
 const {buttons, selectMenus, modals} = client;


case "buttons":
    for(const file of componentFiles){
        const button = require(`../../components/${folder}/${file}`);
        buttons.set(button.data.name, button);
    }
    break;

case "selectMenus":
    for(const file of componentFiles){
        const menu = require(`../../components/${folder}/${file}`);
        selectMenus.set(menu.data.name, menu);
    }
    break;

```

## bot.js

```javascript
client.buttons = new Collection();
client.selectMenus = new Collection();
```

## databaseExample.json

```json
{
	"1052170405378543687": {
		"viewFunction": {
			"nft": {
				"name": "nft",
				"abi": "",
				"address": "",
				"blockchain": "",
				"textBefore": "",
				"textAfter": "",
				"whoCanCall": "",
				"valuesToEnter": {
					"1": "",
					"2": ""
				}
			}
		}
	}
}
```
