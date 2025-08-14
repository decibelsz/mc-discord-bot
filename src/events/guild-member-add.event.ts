import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildMember, TextChannel, EmbedBuilder } from 'discord.js';

@Injectable()
export class GuildMemberAddEvent {
  private readonly logger = new Logger(GuildMemberAddEvent.name);

  @On('guildMemberAdd')
  public async onGuildMemberAdd(@Context() [member]: ContextOf<'guildMemberAdd'>) {
    try {
      this.logger.log(`Novo membro entrou no servidor: ${member.user.tag} (${member.id})`);
      
      // Buscar o cargo "member" pelo nome
      const memberRole = member.guild.roles.cache.find(role => role.name === 'member');
      
      if (memberRole) {
        try {
          await member.roles.add(memberRole);
          this.logger.log(`Cargo "member" adicionado para ${member.user.tag}`);
        } catch (roleError) {
          this.logger.error(`Erro ao adicionar cargo "member" para ${member.user.tag}:`, roleError);
        }
      } else {
        this.logger.warn('Cargo "member" não encontrado no servidor');
      }
      
      // Buscar o canal "joined" pelo nome
      const joinedChannel = member.guild.channels.cache.find(
        channel => channel.name === 'joined' && channel.isTextBased()
      ) as TextChannel;

      if (!joinedChannel) {
        this.logger.warn('Canal "joined" não encontrado');
        return;
      }

      // Embed com foto e texto na mesma mensagem
      const welcomeEmbed = new EmbedBuilder()
        .setImage(member.user.displayAvatarURL({ size: 256 }))
        .setDescription(`-# ${member} entrou no servidor!\n` +
          `-# **Usuário:** ${member.user.tag}\n` +
          `-# **ID:** ${member.id}`);

      await joinedChannel.send({ embeds: [welcomeEmbed] });
      this.logger.log(`Mensagem de boas-vindas enviada para ${member.user.tag}`);
      
    } catch (error) {
      this.logger.error('Erro ao processar entrada de membro:', error);
    }
  }
} 