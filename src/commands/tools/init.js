const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../../schemas/guild");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("init")
		.setDescription("Initialise The Blockchain Adapter for this server")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
		let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });

		//Check if the guildProfile has already been created. If not, create it
		if (!guildProfile) {
			guildProfile = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildId: interaction.guild.id,
				guildName: interaction.guild.name,
				guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : "None.",
			});
			await guildProfile.save().catch(console.error);
			await interaction.reply({
				content: `${guildProfile.guildName} has been initialized successfully!`,
			});

			//If the guildProfile is already created :
		} else {
			await interaction.reply({
				content: `${guildProfile.guildName} has already been initialized!`,
				ephemeral: true,
			});
		}
	},
};
