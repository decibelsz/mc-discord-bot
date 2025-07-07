import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { EmbedBuilder } from 'discord.js';

@Injectable()
export class ServerInfoCommand {
  @SlashCommand({
    name: 'serverinfo',
    description: 'Mostra informações sobre o servidor',
  })
  public async onServerInfo(@Context() [interaction]: SlashCommandContext) {
    const guild = interaction.guild;
    
    if (!guild) {
      return interaction.reply({
        content: '❌ Este comando só pode ser usado em servidores!',
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`🏰 Informações do Servidor`)
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: '📛 Nome', value: guild.name, inline: true },
        { name: '🆔 ID', value: guild.id, inline: true },
        { name: '👑 Dono', value: `<@${guild.ownerId}>`, inline: true },
        { name: '👥 Membros', value: guild.memberCount.toString(), inline: true },
        { name: '📅 Criado em', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
        { name: '🎭 Cargos', value: guild.roles.cache.size.toString(), inline: true },
        { name: '📝 Canais', value: guild.channels.cache.size.toString(), inline: true },
        { name: '😀 Emojis', value: guild.emojis.cache.size.toString(), inline: true },
        { name: '🔒 Nível de verificação', value: guild.verificationLevel.toString(), inline: true },
      )
      .setColor('#0099ff')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
} 