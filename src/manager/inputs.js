module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		const plainDataOrAction = dataOrAction.toObject();

		// Convert the inputs to the correct type
		const inputs = [];
		for (let i = 0; i < plainDataOrAction.inputs?.length; i++) {
			let input = plainDataOrAction.inputs[i];

			//if input is a string, replace #LETTER# with the inputs that correspond to the letter
			if (typeof input == "string") {
				input = input.replace(/#([A-Z])#/g, (match, letter) => {
					return scriptInputs[letter.charCodeAt(0) - 65];
				});
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

		// Check all the objects and if they contains one or mutliple #LETTER# in their string, replace them with the inputs that correspond to the letter
		Object.entries(plainDataOrAction).forEach(([key, value]) => {
			if (key != "inputs") {
				const string = value.toString();
				plainDataOrAction[key] = string.replace(/#([A-Z])#/g, (match, letter) => {
					return scriptInputs[letter.charCodeAt(0) - 65];
				});
			}
		});

		// Add the converted inputs to the plainDataOrAction object
		plainDataOrAction.inputs = inputs;

		//return the inputs and the plainDataOrAction object
		return plainDataOrAction;
	},
};
