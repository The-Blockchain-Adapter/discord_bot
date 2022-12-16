const {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
	PermissionFlagsBits,
} = require("discord.js");
const Guild = require("../../schemas/guild");

// Command details
module.exports = {
	data: new SlashCommandBuilder()
		.setName("createview")
		.setDescription("Create a new view function")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
		// Verify if this guild is on the database
		const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
		if (!guildProfile) {
			await interaction.reply({
				content: `Call the /init command before using other commands on the server.`,
				ephemeral: true,
			});
			return;
		}

		// Create the modal
		const modal = new ModalBuilder()
			.setCustomId(`createview-2`)
			.setTitle(`Create a new view function`);

		// Create all the components of the modal
		const name = new TextInputBuilder()
			.setCustomId("NameInput")
			.setLabel(`Function name`)
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		const address = new TextInputBuilder()
			.setCustomId("AddressInput")
			.setLabel(`Address`)
			.setRequired(true)
			.setStyle(TextInputStyle.Short)
			.setMaxLength(42);

		const blockchain = new TextInputBuilder()
			.setCustomId("BlockchainInput")
			.setLabel(`Blockchain`)
			.setValue("mainnet")
			.setPlaceholder("mainnet / goerli / sepolia")
			.setRequired(true)
			.setStyle(TextInputStyle.Short)
			.setMaxLength(7);

		const text = new TextInputBuilder()
			.setCustomId("TextInput")
			.setLabel(`Text written around the result`)
			.setPlaceholder("...  ${data}  ...")
			.setValue("...  ${data}  ...")
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		const abi = new TextInputBuilder()
			.setCustomId("AbiInput")
			.setLabel(`ABI`)
			.setRequired(true)
			.setStyle(TextInputStyle.Paragraph);

		// Add the components and show the modal
		modal.addComponents(new ActionRowBuilder().addComponents(name));
		modal.addComponents(new ActionRowBuilder().addComponents(address));
		modal.addComponents(new ActionRowBuilder().addComponents(blockchain));
		modal.addComponents(new ActionRowBuilder().addComponents(text));
		modal.addComponents(new ActionRowBuilder().addComponents(abi));
		await interaction.showModal(modal);
	},
};
