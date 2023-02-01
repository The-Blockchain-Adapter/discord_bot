/*
module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		// Convert the inputs to the correct type
		const inputs = [];
		for (let i = 0; i < dataOrAction.inputs?.length; i++) {
			let input = dataOrAction.inputs[i];

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

		console.log(Object.keys(dataOrAction));
		console.log(dataOrAction);
		console.log(dataOrAction?.url);
		console.log(dataOrAction?.path);

		// replace The dataOrAction's nested objects if there are equal to a letter
		const objects = [
			dataOrAction?.blockchain,
			dataOrAction?.address,
			dataOrAction?.name,
			dataOrAction?.abi,
			dataOrAction?.text,
			dataOrAction?.url,
			dataOrAction?.path,
		];
		for (let i = 0; i < objects.length; i++) {
			if (objects[i]?.length == 1 && objects[i].match(/[A-Z]/i)) {
				objects[i] = scriptInputs[objects[i].charCodeAt(0) - 65];
			}

			console.log(objects[i]);
		}

		// store the new values in the dataOrAction object
		dataOrAction.inputs = inputs;
		dataOrAction.blockchain = objects[0];
		dataOrAction.address = objects[1];
		dataOrAction.name = objects[2];
		dataOrAction.abi = objects[3];
		dataOrAction.text = objects[4];
		dataOrAction.url = objects[5];
		dataOrAction.path = objects[6];

		//return the inputs and the dataOrAction object
		return dataOrAction;
	},
};
/*
module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		console.log(dataOrAction);
		console.log(dataOrAction?.url);
		console.log(dataOrAction?.path);

		// replace The dataOrAction's nested objects if there are equal to a letter
		const objects = [
			dataOrAction?.blockchain,
			dataOrAction?.address,
			dataOrAction?.name,
			dataOrAction?.abi,
			dataOrAction?.text,
			dataOrAction?.url,
			dataOrAction?.path,
		];
		for (let i = 0; i < objects.length; i++) {
			if (objects[i]?.length == 1 && objects[i].match(/[A-Z]/i)) {
				objects[i] = scriptInputs[objects[i].charCodeAt(0) - 65];
			}
		}

		// store the new values in the dataOrAction object
		dataOrAction.inputs = inputs;
		dataOrAction.blockchain = objects[0];
		dataOrAction.address = objects[1];
		dataOrAction.name = objects[2];
		dataOrAction.abi = objects[3];
		dataOrAction.text = objects[4];
		dataOrAction.url = objects[5];
		dataOrAction.path = objects[6];

		//return the inputs and the dataOrAction object
		return dataOrAction;
	},
};
*/

module.exports = {
	getInputs(dataOrAction, scriptInputs) {
		const plainDataOrAction = dataOrAction.toObject();

		// Convert the inputs to the correct type
		const inputs = [];
		for (let i = 0; i < plainDataOrAction.inputs?.length; i++) {
			let input = plainDataOrAction.inputs[i];

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

		console.log(Object.keys(dataOrAction));
		console.log(Object.keys(plainDataOrAction));
		console.log(plainDataOrAction);
		console.log(plainDataOrAction.url);
		console.log(plainDataOrAction.path);

		// define the objects array
		const objects = [
			plainDataOrAction.blockchain,
			plainDataOrAction.address,
			plainDataOrAction.name,
			plainDataOrAction.abi,
			plainDataOrAction.text,
			plainDataOrAction.url,
			plainDataOrAction.path,
		];

		// replace The plainDataOrAction's nested objects if there are equal to a letter
		for (let i = 0; i < objects.length; i++) {
			if (objects[i]?.length == 1 && objects[i].match(/[A-Z]/i)) {
				objects[i] = scriptInputs[objects[i].charCodeAt(0) - 65];
			}
		}

		// store the new values in the plainDataOrAction object
		plainDataOrAction.inputs = inputs;
		plainDataOrAction.blockchain = objects[0];
		plainDataOrAction.address = objects[1];
		plainDataOrAction.name = objects[2];
		plainDataOrAction.abi = objects[3];
		plainDataOrAction.text = objects[4];
		plainDataOrAction.url = objects[5];
		plainDataOrAction.path = objects[6];

		//return the inputs and the plainDataOrAction object
		return plainDataOrAction;
	},
};
