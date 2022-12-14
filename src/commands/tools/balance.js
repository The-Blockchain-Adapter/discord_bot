const {SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Get the ETH Balance of a User'),
    async execute(interaction, client){
        
        const modal = new ModalBuilder()
            .setCustomId(`balance-message`)
            .setTitle(`Get the ETH Balance of a User`)

        const address = new TextInputBuilder()
            .setCustomId("AddressInput")
            .setLabel(`ETH Address or ENS name`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

        const blockchain = new TextInputBuilder()
            .setCustomId("BlockchainInput")
            .setLabel(`Blockchain`)
            .setPlaceholder("mainnet / goerli / sepolia")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

        modal.addComponents(new ActionRowBuilder().addComponents(address))
        modal.addComponents(new ActionRowBuilder().addComponents(blockchain))
        await interaction.showModal(modal);
    }
}