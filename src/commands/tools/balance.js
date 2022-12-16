const {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");
const Guild = require("../../schemas/guild");

// Command details
module.exports = {
	data: new SlashCommandBuilder()
		.setName("balance")
		.setDescription("Get the ETH Balance of a User"),
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
			.setCustomId(`balance-reply`)
			.setTitle(`Get the ETH Balance of a User`);

		// Create the address component
		const address = new TextInputBuilder()
			.setCustomId("AddressInput")
			.setLabel(`ETH Address or ENS name`)
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		// Create the blockchain component
		const blockchain = new TextInputBuilder()
			.setCustomId("BlockchainInput")
			.setLabel(`Blockchain`)
			.setPlaceholder("mainnet / goerli / sepolia")
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		// Add the components and show the modal
		modal.addComponents(new ActionRowBuilder().addComponents(address));
		modal.addComponents(new ActionRowBuilder().addComponents(blockchain));
		await interaction.showModal(modal);
	},
};
