import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
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
  @SlashCommand({
    name: 'mcwhitelist',
    description: 'Exibe o painel de whitelist do servidor de mine.',
  })
  public async onWhitelistPanel(@Context() [interaction]: SlashCommandContext) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
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
            ),
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