module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		const inputs = [];
		for (var i = 0; i < dataOrAction.inputs.length; i++) {
			var input = dataOrAction.inputs[i];

			// Detect if the input string is a letter, then convert it to a normal input
			if (input.length == 1 && input.match(/[A-Z]/i)) {
				input = scriptInputs[input.charCodeAt(0) - 65];
			}

			// Detect if the input string is a boolean, then convert it to a boolean
			if (input == "true" || input == "false") {
				inputs.push(Boolean(input));

				// Detect if the input string is a hex string
			} else if (input.startsWith("0x") || input.startsWith("0X")) {
				inputs.push(input);

				// Detect if the input string is a number, then convert it to a number
			} else if (!isNaN(input)) {
				inputs.push(Number(input));

				// Else, it's a string
			} else {
				inputs.push(input);
			}
		}
		return inputs;
	},
};
