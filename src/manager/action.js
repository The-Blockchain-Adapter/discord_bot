module.exports = {
	async doAction(action, inputs, interaction, client) {
		// call the message function
		if (action.type == "message") {
			await message(action, inputs, interaction, client);
		}
	},
};

// Call a message function
async function message(action, inputs, interaction, client) {
	// Replace the #LETTER# in the text with the inputs that correspond to the letter
	const text = action.text.replace(/#([A-Z])#/g, (match, letter) => {
		const index = letter.charCodeAt(0) - 65;
		return inputs[index];
	});

	action.channel = "1052170405378543690";

	// How to send a message in another channel
	const channel = client.channels.cache.get(action.channel);
	console.log(channel);
	if (!channel) {
		throw new Error(`The channel with ID ${action.channel} could not be found.`);
	}
	return channel.send(text);
}

/* BEFORE :
	// Send the message
	return interaction.channel.send(text);
	*/
