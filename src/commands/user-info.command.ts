import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { EmbedBuilder } from 'discord.js';

@Injectable()
export class UserInfoCommand {
  @SlashCommand({
    name: 'userinfo',
    description: 'Mostra suas informações de usuário',
  })
  public async onUserInfo(
    @Context() [interaction]: SlashCommandContext,
  ) {
    const targetUser = interaction.user;
    const member = interaction.guild?.members.cache.get(targetUser.id);
    
    const embed = new EmbedBuilder()
      .setTitle(`📋 Informações do Usuário`)
      .setThumbnail(targetUser.displayAvatarURL())
      .addFields(
        { name: '👤 Nome', value: targetUser.username, inline: true },
        { name: '🏷️ Tag', value: targetUser.tag, inline: true },
        { name: '🆔 ID', value: targetUser.id, inline: true },
        { name: '📅 Conta criada', value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:D>`, inline: true },
      )
      .setColor('#0099ff')
      .setTimestamp();

    if (member) {
      embed.addFields(
        { name: '📥 Entrou no servidor', value: member.joinedAt ? `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:D>` : 'Desconhecido', inline: true },
        { name: '🎭 Cargos', value: member.roles.cache.size > 1 ? member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.toString()).join(', ') : 'Nenhum', inline: false },
      );
    }

    await interaction.reply({ embeds: [embed] });
  }
} 