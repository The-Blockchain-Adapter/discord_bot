module.exports = {
	async doAction(action, inputs, interaction, client, guild) {
		// call the message function
		if (action.type == "message") {
			await message(action, inputs, interaction, client, guild);
		}
	},
};

// Call a message function
async function message(action, inputs, interaction, client, guild) {
	// Replace the #LETTER# in the text with the inputs that correspond to the letter
	const text = action.text.replace(/#([A-Z])#/g, (match, letter) => {
		const index = letter.charCodeAt(0) - 65;
		return inputs[index];
	});

	// if the channel name is #current#, send the message in the current channel
	if (action.channel == "#current#") {
		return interaction.channel.send(text);

		// get the real channel object from the channel name
	} else {
		const actualGuild = client.guilds.cache.get(guild.discordId);
		const channel = actualGuild.channels.cache.find(
			(channel) => channel.name === action.channel
		);

		// Throw an error if the channel doesn't exist
		if (!channel) {
			throw new Error(`The channel ${action.channel} could not be found.`);
		}

		// Send the message
		return channel.send(text);
	}
}
