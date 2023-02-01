const { getData } = require("./data.js");
const { doAction } = require("./action.js");
const { getInputs } = require("./inputs.js");

module.exports = {
	async scriptManager(interaction, client, guild, command, inputs) {
		// Call the data functions one by one and pass the result of the previous function as input
		for (var i = 0; i < command?.data?.length && i < 10; i++) {
			var data = command.data[i];

			// Get the updated data object with its inputs
			const newData = getInputs(data, inputs);

			// Call the data function
			try {
				var result = await getData(newData, interaction);

				// Return an error if the data function failed
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content: `The ${newData?.name} data function failed while calling the ${command.trigger.name} script.`,
					ephemeral: true,
				});
				return;
			}

			// Return an error if the data function returned null or undefined
			if (result == null || result == undefined) {
				await interaction.reply({
					content: `The ${newData?.name} data function returned null or undefined while calling the ${command.trigger.name} script.`,
					ephemeral: true,
				});
				return;
			}

			// Convert the result to a string if it's a BigNumber
			if (result?._isBigNumber) {
				result = result.toString();
			}

			// Add the result to the inputs array
			inputs.push(result);
		}

		// Call the action functions one by one
		for (var i = 0; i < command.action.length && i < 10; i++) {
			const action = command.action[i];

			// Get the updated action object with its inputs
			const newAction = getInputs(action, inputs);

			// Call the action function
			try {
				await doAction(newAction, inputs, interaction);

				// Return an error if the action function failed
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content: `The ${newAction?.name} ${newAction.type} action function ${
						i + 1
					} failed while calling the ${command.trigger.name} script.`,
					ephemeral: true,
				});
				return;
			}
		}

		// Final message
		await interaction.reply({
			content: `The ${command.trigger.name} script was executed successfully!`,
			ephemeral: true,
		});
		return;
	},
};
