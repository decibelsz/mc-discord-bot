import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildMember, TextChannel, EmbedBuilder } from 'discord.js';

@Injectable()
export class GuildMemberRemoveEvent {
  private readonly logger = new Logger(GuildMemberRemoveEvent.name);

  @On('guildMemberRemove')
  public async onGuildMemberRemove(@Context() [member]: ContextOf<'guildMemberRemove'>) {
    try {
      this.logger.log(`Membro saiu do servidor: ${member.user.tag} (${member.id})`);
      
      // Buscar o canal "left" pelo nome
      const leftChannel = member.guild.channels.cache.find(
        channel => channel.name === 'left' && channel.isTextBased()
      ) as TextChannel;

      if (!leftChannel) {
        this.logger.warn('Canal "left" não encontrado');
        return;
      }

      // Embed com foto e texto na mesma mensagem
      const leaveEmbed = new EmbedBuilder()
        .setImage(member.user.displayAvatarURL({ size: 256 }))
        .setDescription(`-# ${member} saiu do servidor!\n` +
          `-# **Usuário:** ${member.user.tag}\n` +
          `-# **ID:** ${member.id}`);

      await leftChannel.send({ embeds: [leaveEmbed] });
      this.logger.log(`Mensagem de saída enviada para ${member.user.tag}`);
      
    } catch (error) {
      this.logger.error('Erro ao processar saída de membro:', error);
    }
  }
} 