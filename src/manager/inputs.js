module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		// Convert the inputs to the correct type
		const inputs = [];
		for (var i = 0; i < dataOrAction.inputs?.length; i++) {
			var input = dataOrAction.inputs[i];

			// Detect if the input string is a letter, then convert it to a normal input
			if (input.length == 1 && input.match(/[A-Z]/i)) {
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

		// replace The dataOrAction's nested objects if there are equal to a letter
		const objects = [
			dataOrAction?.blockchain,
			dataOrAction?.address,
			dataOrAction?.name,
			dataOrAction?.abi,
			dataOrAction?.text,
		];
		for (var i = 0; i < objects.length; i++) {
			var object = objects[i];

			if (object?.length == 1 && object.match(/[A-Z]/i)) {
				object = scriptInputs[object.charCodeAt(0) - 65];
			}

			// Detect if the object string is a boolean, then convert it to a boolean
			if (object == "true" || object == "false") {
				objects[i] = Boolean(object);

				// Detect if the object string is a hex string
			} else if (object?.startsWith("0x") || object?.startsWith("0X")) {
				objects[i] = object;

				// Detect if the object string is a number, then convert it to a number
			} else if (!isNaN(object)) {
				objects[i] = Number(object);

				// Else, it's a string
			} else {
				objects[i] = object;
			}
		}

		// store the new values in the dataOrAction object
		dataOrAction.inputs = inputs;
		dataOrAction.blockchain = objects[0];
		dataOrAction.address = objects[1];
		dataOrAction.name = objects[2];
		dataOrAction.abi = objects[3];
		dataOrAction.text = objects[4];

		//return the inputs and the dataOrAction object
		return dataOrAction;
	},
};
