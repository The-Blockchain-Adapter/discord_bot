module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		const plainDataOrAction = dataOrAction.toObject();

		// Convert the inputs to the correct type
		const inputs = [];
		for (let i = 0; i < plainDataOrAction.inputs?.length; i++) {
			let input = plainDataOrAction.inputs[i];

			// Detect if the input string is a letter, then convert it to a normal input
			if (input.length == 3 && input.match(/#([A-Z])#/g)) {
				// retrieve the letter string from the string with #
				input.replace(/#([A-Z])#/g, (match, letter) => letter);
				// Get the input from the script inputs
				input = scriptInputs[letter.charCodeAt(0) - 65];
			}

			// Detect if the input string is a boolean, then convert it to a boolean
			if (input == "true" || input == "false") {
				inputs.push(Boolean(input));

				// Detect if the input string is a hex string
			} else if (input?.startsWith("0x") || input?.startsWith("0X")) {
				inputs.push(input);

				// Detect if the input string is a number, then convert it to a number
			} else if (!isNaN(input)) {
				inputs.push(Number(input));

				// Else, it's a string
			} else {
				inputs.push(input);
			}
		}

		// Replace the letter objects with the correct input
		Object.entries(plainDataOrAction).forEach(([key, value]) => {
			if (key != "inputs" && value?.length == 3 && value.match(/#([A-Z])#/g)) {
				// retrieve the letter string from the string with #
				const letter = value[1];
				// replace the letter object with the correct input
				plainDataOrAction[key] = scriptInputs[letter.charCodeAt(0) - 65];
			}
		});

		// Add the converted inputs to the plainDataOrAction object
		plainDataOrAction.inputs = inputs;

		//return the inputs and the plainDataOrAction object
		return plainDataOrAction;
	},
};
