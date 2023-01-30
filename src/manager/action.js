module.exports = {
	async doAction(action, inputs, interaction) {
		// call the message function
		if (action.type == "message") {
			await message(action, inputs, interaction);
		}
	},
};

// Call a message function
async function message(action, inputs, interaction) {
	// Replace the #LETTER# in the text with the inputs that correspond to the letter
	const text = action.text.replace(/#([A-Z])#/g, (match, letter) => {
		const index = letter.charCodeAt(0) - 65;
		return inputs[index];
	});

	// Send the message
	return interaction.channel.send(text);
}
