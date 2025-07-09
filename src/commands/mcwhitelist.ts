import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { Rcon } from 'rcon-client';
import { 
  ContainerBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
  ButtonBuilder, 
  ButtonStyle, 
  ActionRowBuilder, 
  AttachmentBuilder,
  MessageFlags,
  type MessageActionRowComponentBuilder
} from 'discord.js';
import { join } from 'path';

@Injectable()
export class WhitelistPanel {
  private readonly logger = new Logger(WhitelistPanel.name);

  private readonly rconConfig = {
    host: process.env.RCON_HOST || '168.231.89.180',
    port: parseInt(process.env.RCON_PORT || '25575'),
    password: process.env.RCON_PASSWORD || 'SUA_SENHA_RCON'
  };

  private async checkServerStatus(): Promise<{ online: boolean; players?: number; maxPlayers?: number }> {
    try {
      const rcon = new Rcon({
        host: this.rconConfig.host,
        port: this.rconConfig.port,
        password: this.rconConfig.password
      });
      
      await rcon.connect();
      const listResult = await rcon.send('list');
      await rcon.end();
      
      this.logger.debug(`Resultado do comando list: "${listResult}"`);
      
      let players = 0;
      let maxPlayers = 0;
      
      let match = listResult.match(/(\d+)\/(\d+)/);
      if (match) {
        players = parseInt(match[1]);
        maxPlayers = parseInt(match[2]);
      } else {
        match = listResult.match(/(\d+)\/(\d+)\s*players?/i);
        if (match) {
          players = parseInt(match[1]);
          maxPlayers = parseInt(match[2]);
        } else {
          match = listResult.match(/(\d+)\/(\d+)/);
          if (match) {
            players = parseInt(match[1]);
            maxPlayers = parseInt(match[2]);
          }
        }
      }
      
      if (players > 0 || maxPlayers > 0) {
        this.logger.debug(`Jogadores detectados: ${players}/${maxPlayers}`);
        return { online: true, players, maxPlayers };
      }
      
      if (listResult.toLowerCase().includes('players online') || listResult.includes(':')) {
        const playerNames = listResult.split(':')[1]?.trim();
        if (playerNames && playerNames !== '') {
          const playerCount = playerNames.split(',').length;
          this.logger.debug(`Jogadores estimados por nomes: ${playerCount}`);
          return { online: true, players: playerCount, maxPlayers: 20 };
        }
      }
      
      this.logger.debug(`Servidor online, mas não foi possível detectar jogadores`);
      return { online: true, players: 0, maxPlayers: 20 };
    } catch (error) {
      this.logger.debug(`Servidor offline: ${error.message}`);
      return { online: false };
    }
  }

  @SlashCommand({
    name: 'mcwhitelist',
    description: 'Exibe o painel de whitelist do servidor de mine.',
  })
  public async onWhitelistPanel(@Context() [interaction]: SlashCommandContext) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    
    const serverStatus = await this.checkServerStatus();
    
    let statusButton: ButtonBuilder;
    if (serverStatus.online) {
      statusButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel(`(${serverStatus.players}/${serverStatus.maxPlayers} jogadores)`)
        .setCustomId("server-status-button")
        .setDisabled(true);
    } else {
      statusButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setLabel("Servidor Offline")
        .setCustomId("server-status-button")
        .setDisabled(true);
    }

    const components = [
      new ContainerBuilder()
        .setAccentColor(16711680)
        .addTextDisplayComponents(
          new TextDisplayBuilder()
            .setContent("**-# VERSÃO 1.21.7**"),
        )
        .addSeparatorComponents(
          new SeparatorBuilder()
            .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true),
        )
        .addTextDisplayComponents(
          new TextDisplayBuilder()
            .setContent("-# Painel de whitelist do servidor."),
        )
        .addSeparatorComponents(
          new SeparatorBuilder()
            .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true),
        )
        .addTextDisplayComponents(
          new TextDisplayBuilder()
            .setContent("-# **Clique nos botões abaixo para acessar o servidor:**"),
        )
        .addActionRowComponents(
          new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents(
              new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setLabel("ip do servidor")
                .setCustomId("9cffd086283f4151a968f96d236175ad"),
              new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setLabel("whitelist")
                .setCustomId("1f8d34948b7c4089d6d8803a384b4bb9"),
              new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setLabel("comandos")
                .setCustomId("comandos-panel-button"),
            ),
        )
        .addActionRowComponents(
          new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents(statusButton),
        ),
    ];

    const imagePath = join(process.cwd(), "src/assets/logo.gif");
    const attachment = new AttachmentBuilder(imagePath);

    await interaction.channel.send({ 
      components: components,
      flags: MessageFlags.IsComponentsV2
    });

    await interaction.editReply({ 
      content: "✅ Painel de whitelist enviado!"
    });
  }
} 