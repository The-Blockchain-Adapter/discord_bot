const {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");
const Guild = require("../../schemas/guild");
const { scriptManager } = require("../../manager/main");

// Command details
module.exports = {
	data: new SlashCommandBuilder()
		.setName("script")
		.setDescription("Call a command script")
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("Select the script to call")
				.setAutocomplete(true)
				.setRequired(true)
		),

	// Get the function names to autocomplete the command
	async autocomplete(interaction, client) {
		// Verify if this guild is on the database and if there are any scripts registered
		const guild = await Guild.findOne({ discordId: interaction.guild.id });
		if (!guild || !guild.scripts || guild.scripts.length == 0) {
			return;
		}

		// Verify if the user is an admin
		const permissions = interaction.memberPermissions?.bitfield.toString();
		const admin = (parseInt(permissions) & 0x8) === 0x8;

		// Get the list of all the commands that the user can call (if he is an admin, he can call all the commands)
		let choices = [];
		for (i = 0; i < guild.scripts?.length; i++) {
			if (guild.scripts[i].trigger.type == "command") {
				if (admin || !guild.scripts[i].trigger.onlyAdmin) {
					choices.push(guild.scripts[i].trigger.name);
				}
			}
		}

		// Filter the choices based on the user input
		const focusedValue = interaction.options.getFocused();
		const filtered = choices.filter((choice) => choice.startsWith(focusedValue));
		await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
	},

	async execute(interaction, client) {
		// Verify if this guild is on the database
		const guild = await Guild.findOne({ discordId: interaction.guild.id });
		if (!guild) {
			await interaction.reply({
				content: `Call the /init command before using other commands on the server.`,
				ephemeral: true,
			});
			return;
		}

		// Verify if this function is registered on the server
		const command = guild.scripts.find(
			(script) => script.trigger.name == interaction.options.getString("name")
		);
		if (!command) {
			await interaction.reply({
				content: `This script is not registered on the server.`,
				ephemeral: true,
			});
			return;
		}

		// Verify if the script trigger is a discord command
		if (command.trigger.type != "command") {
			await interaction.reply({
				content: `This script trigger is not a discord command.`,
				ephemeral: true,
			});
			return;
		}

		// Verify if the user is an admin or if the command can be called by everyone
		const permissions = interaction.memberPermissions?.bitfield.toString();
		const admin = (parseInt(permissions) & 0x8) === 0x8;
		if (!admin && command.trigger.onlyAdmin) {
			await interaction.reply({
				content: `Only admins can call this command.`,
				ephemeral: true,
			});
			return;
		}

		// Create the modal to get the inputs of the function
		if (command.trigger.inputs.length > 0) {
			const modal = new ModalBuilder()
				.setCustomId(`script-${command.trigger.name}`)
				.setTitle(`${command.trigger.title}`);

			// Add values to enter in the modal
			for (var i = 0; i < command.trigger.inputs.length && i < 5; i++) {
				const input = new TextInputBuilder()
					.setCustomId(command.trigger.outputs[i])
					.setLabel(`${command.trigger.inputs[i]}`)
					.setRequired(true)
					.setStyle(TextInputStyle.Short);

				//Add this component to the modal
				modal.addComponents(new ActionRowBuilder().addComponents(input));
			}

			//Show the modal
			await interaction.showModal(modal);
			return;

			// Call the scriptManager without any input
		} else {
			const inputs = [];
			await scriptManager(interaction, client, guild, command, inputs);
			return;
		}
	},
};
