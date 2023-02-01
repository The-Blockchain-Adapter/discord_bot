module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		const plainDataOrAction = dataOrAction.toObject();

		// Convert the inputs to the correct type
		const inputs = [];
		for (let i = 0; i < plainDataOrAction.inputs?.length; i++) {
			let input = plainDataOrAction.inputs[i];

			// Detect if the input string is a letter, then convert it to a normal input
			if (input.length == 3 && input.match(/#([A-Z])#/i)) {
				input = scriptInputs[input.charCodeAt(0) - 65];
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
			if (key != "inputs" && value?.length == 3 && value.match(/#([A-Z])#/i)) {
				plainDataOrAction[key] = scriptInputs[value.charCodeAt(0) - 65];
			}
		});

		// Add the converted inputs to the plainDataOrAction object
		plainDataOrAction.inputs = inputs;

		//return the inputs and the plainDataOrAction object
		return plainDataOrAction;
	},
};
