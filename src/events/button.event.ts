import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { Rcon } from 'rcon-client';
import { 
  MessageFlags, 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ChannelType,
  ContainerBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
  type MessageActionRowComponentBuilder
} from 'discord.js';

@Injectable()
export class ButtonEvent {
  private readonly logger = new Logger(ButtonEvent.name);

  private readonly rconConfig = {
    host: process.env.RCON_HOST || '168.231.89.180',
    port: parseInt(process.env.RCON_PORT || '25575'),
    password: process.env.RCON_PASSWORD || 'SUA_SENHA_RCON'
  };



  @On('interactionCreate')
  public async onButtonInteraction(@Context() [interaction]: ContextOf<'interactionCreate'>) {
    if (interaction.isButton()) {
      await this.handleButtonInteraction(interaction);
      return;
    }

    if (interaction.isModalSubmit()) {
      await this.handleModalSubmit(interaction);
      return;
    }
  }

  private async handleButtonInteraction(interaction: any) {
    if (interaction.customId === '9cffd086283f4151a968f96d236175ad') {
      await interaction.reply({
        content: process.env.RCON_HOST || '168.231.89.180',
        flags: MessageFlags.Ephemeral
      });

      this.logger.debug(`🔗 ${interaction.user.username} clicou no botão conectar`);
    }
    
    if (interaction.customId === '1f8d34948b7c4089d6d8803a384b4bb9') {
      const modal = new ModalBuilder()
        .setCustomId('whitelist-modal')
        .setTitle('📝 Solicitação de Whitelist');

      const nicknameInput = new TextInputBuilder()
        .setCustomId('minecraft-nickname')
        .setLabel('Qual o seu nickname do Minecraft?')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Digite seu nickname exatamente como aparece no jogo')
        .setRequired(true)
        .setMaxLength(16)
        .setMinLength(3);

      const actionRow = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(nicknameInput);

      modal.addComponents(actionRow);

      await interaction.showModal(modal);
      
      this.logger.debug(`📝 ${interaction.user.username} abriu o modal de whitelist`);
    }

    if (interaction.customId === 'comandos-panel-button') {
      const comandosComponents = [
        new ContainerBuilder()
          .setAccentColor(16711680)
          // .addSeparatorComponents(
          //   new SeparatorBuilder()
          //     .setSpacing(SeparatorSpacingSize.Small)
          //     .setDivider(true),
          // )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("**-# 🔒 COMANDOS DE PROTEÇÃO (BAUS)**"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cmodify [nickname]` - Adiciona ou remove permissão de outro jogador (clique no baú primeiro)"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cmodify -[nickname]` - Remove permissão de um jogador específico"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cunlock [senha]` - Abre baú protegido com senha"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cowner [nickname]` - Passa a propriedade do baú para outro jogador"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cprivate` - Protege baú só para você (clique no baú depois)"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cpublic` - Deixa baú aberto para todos (qualquer um pode usar)"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cpassword [senha]` - Protege baú com senha"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cremove` - Remove proteção do baú (clique no baú primeiro)"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/cinfo` - Mostra informações da proteção (clique no baú)"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("**-# 🏠 COMANDOS DE TELEPORTE PARA CASA**"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/home [nome]` - Teleporta para sua casa"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/sethome [nome]` - Marca este local como sua casa"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/delhome [nome]` - Remove uma casa marcada"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("**-# 🚀 COMANDOS DE TELEPORTE PARA JOGADOR**"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/tp [nickname]` - Teleporta para onde está um jogador"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("**-# 🛡️ COMANDOS TERRITORIO**"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/claim` - Protege uma área do seu terreno"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/abandonclaim` - Remove proteção de uma área"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/trust [nickname]` - Permite que alguém construa na sua área"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/untrust [nickname]` - Remove permissão de construir"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/trustlist` - Mostra quem pode construir na sua área"),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("-# `/claiminfo` - Mostra informações da área protegida"),
          )
          .addSeparatorComponents(
            new SeparatorBuilder()
              .setSpacing(SeparatorSpacingSize.Small)
              .setDivider(true),
          )
          .addTextDisplayComponents(
            new TextDisplayBuilder()
              .setContent("**-# 💡 DICA:** Use `/help` no jogo para ver mais comandos!"),
          ),
      ];

      await interaction.reply({
        components: comandosComponents,
        flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
      });

      this.logger.debug(`📋 ${interaction.user.username} visualizou a lista de comandos`);
    }

    if (interaction.customId.startsWith('approve-')) {
      const channelId = interaction.customId.replace('approve-', '');
      const channel = interaction.guild.channels.cache.get(channelId);
      
      if (!channel) {
        await interaction.reply({
          content: '❌ **Erro:** Canal não encontrado.',
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      const nickname = channel.name;
      
      try {
        const rcon = new Rcon({
          host: this.rconConfig.host,
          port: this.rconConfig.port,
          password: this.rconConfig.password
        });
        
        await rcon.connect();
        
        const command = `whitelist add ${nickname}`;
        const result = await rcon.send(command);
        
        await rcon.end();
        
        await interaction.reply({
          content: `✅ **Whitelist Aprovada!**\n\n🎮 **Nickname:** \`${nickname}\`\n🔧 **Comando executado:** \`${command}\`\n📋 **Resultado:** \`${result}\`\n\n✨ O jogador foi adicionado à whitelist do servidor!`,
          flags: MessageFlags.Ephemeral
        });

        const approvedComponents = [
          new ContainerBuilder()
            .setAccentColor(16711680)
            .addSeparatorComponents(
              new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
                .setDivider(true),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent("-# WHITELIST APROVADA!"),
            )
            .addSeparatorComponents(
              new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
                .setDivider(true),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent(`-# **Nickname:** \`${nickname}\``),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent(`-# **Aprovado por:** ${interaction.user.toString()}`),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent(`-# **Data da Aprovação:** <t:${Math.floor(Date.now() / 1000)}:F>`),
            )
            .addSeparatorComponents(
              new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
                .setDivider(true),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent("-# **O jogador foi adicionado à whitelist do servidor!**"),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent("-# **Este canal será fechado em 10 segundos.**"),
            ),
        ];

        await channel.send({
          components: approvedComponents,
          flags: MessageFlags.IsComponentsV2
        });

        this.logger.log(`✅ ${interaction.user.username} aprovou whitelist para ${nickname} - Comando: ${command} - Resultado: ${result}`);

        setTimeout(async () => {
          try {
            await channel.delete('Whitelist aprovada - canal finalizado');
            this.logger.log(`✅ Canal ${channel.name} excluído após aprovação`);
          } catch (error) {
            this.logger.error('Erro ao excluir canal após aprovação:', error);
          }
        }, 10000);

      } catch (error) {
        this.logger.error('Erro ao executar comando via RCON:', error);
        await interaction.reply({
          content: `❌ **Erro ao executar comando via RCON!**\n\n🎮 **Nickname:** \`${nickname}\`\n⚠️ **Erro:** ${error.message}\n\n🔧 Verifique se:\n• O servidor está rodando\n• RCON está habilitado\n• A senha RCON está correta\n• A porta RCON está acessível`,
          flags: MessageFlags.Ephemeral
        });
      }
    }

    if (interaction.customId.startsWith('deny-')) {
      const channelId = interaction.customId.replace('deny-', '');
      const channel = interaction.guild.channels.cache.get(channelId);
      
      if (channel) {
        await interaction.reply({
          content: `❌ **Solicitação Negada**\n\nEste canal será excluído em 5 segundos.`,
          flags: MessageFlags.Ephemeral
        });

        setTimeout(async () => {
          try {
            await channel.delete('Solicitação de whitelist negada');
            this.logger.log(`❌ ${interaction.user.username} negou whitelist - Canal ${channel.name} excluído`);
          } catch (error) {
            this.logger.error('Erro ao excluir canal:', error);
          }
        }, 5000);
      } else {
        await interaction.reply({
          content: '❌ **Erro:** Canal não encontrado.',
          flags: MessageFlags.Ephemeral
        });
      }
    }
  }

  private async handleModalSubmit(interaction: any) {
    if (interaction.customId === 'whitelist-modal') {
      const nickname = interaction.fields.getTextInputValue('minecraft-nickname');
      
      try {
        let skipWhitelistCheck = false;
        
        try {
          const rcon = new Rcon({
            host: this.rconConfig.host,
            port: this.rconConfig.port,
            password: this.rconConfig.password
          });
          
          await rcon.connect();
          const whitelistResult = await rcon.send('whitelist list');
          await rcon.end();
          
          if (whitelistResult.toLowerCase().includes(nickname.toLowerCase())) {
            const alreadyWhitelistedComponents = [
              new ContainerBuilder()
                .setAccentColor(16711680)
                .addSeparatorComponents(
                  new SeparatorBuilder()
                    .setSpacing(SeparatorSpacingSize.Small)
                    .setDivider(true),
                )
                .addTextDisplayComponents(
                  new TextDisplayBuilder()
                    .setContent("-# Jogador já está na whitelist!"),
                )
                .addSeparatorComponents(
                  new SeparatorBuilder()
                    .setSpacing(SeparatorSpacingSize.Small)
                    .setDivider(true),
                )
                .addTextDisplayComponents(
                  new TextDisplayBuilder()
                    .setContent(`-# **Nickname:** \`${nickname}\``),
                )
                .addTextDisplayComponents(
                  new TextDisplayBuilder()
                    .setContent(`-# **Status:** Já possui acesso ao servidor`),
                )
                .addSeparatorComponents(
                  new SeparatorBuilder()
                    .setSpacing(SeparatorSpacingSize.Small)
                    .setDivider(true),
                )
                .addTextDisplayComponents(
                  new TextDisplayBuilder()
                    .setContent("-# **Este jogador já tem acesso ao servidor.**"),
                )
                .addTextDisplayComponents(
                  new TextDisplayBuilder()
                    .setContent("-# **Não é necessário fazer nova solicitação.**"),
                ),
            ];

            await interaction.reply({
              components: alreadyWhitelistedComponents,
              flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
            });
            
            this.logger.log(`⚠️ ${interaction.user.username} tentou solicitar whitelist para ${nickname}, mas já está na whitelist`);
            return;
          }
          
          this.logger.debug(`🔍 Verificação de whitelist concluída para ${nickname} - não está na whitelist`);
          
        } catch (rconError) {
          this.logger.warn(`⚠️ Erro ao verificar whitelist via RCON: ${rconError.message}. Prosseguindo com criação do canal.`);
          skipWhitelistCheck = true;
        }
        
        const guild = interaction.guild;
        const category = guild.channels.cache.find(
          (channel: any) => channel.name === 'whitelist_minecraft' && channel.type === ChannelType.GuildCategory
        );

        if (!category) {
          await interaction.reply({
            content: '❌ **Erro:** Categoria "whitelist_minecraft" não encontrada. Entre em contato com os administradores.',
            flags: MessageFlags.Ephemeral
          });
          return;
        }

        const existingChannel = category.children.cache.find(
          (channel: any) => channel.name === nickname.toLowerCase()
        );
        
        if (existingChannel) {
          const duplicateRequestComponents = [
            new ContainerBuilder()
              .setAccentColor(16711680)
              .addSeparatorComponents(
                new SeparatorBuilder()
                  .setSpacing(SeparatorSpacingSize.Small)
                  .setDivider(true),
              )
              .addTextDisplayComponents(
                new TextDisplayBuilder()
                  .setContent("-# Solicitação já existe!"),
              )
              .addSeparatorComponents(
                new SeparatorBuilder()
                  .setSpacing(SeparatorSpacingSize.Small)
                  .setDivider(true),
              )
              .addTextDisplayComponents(
                new TextDisplayBuilder()
                  .setContent(`-# **Nickname:** \`${nickname}\``),
              )
              .addTextDisplayComponents(
                new TextDisplayBuilder()
                  .setContent(`-# **Canal:** ${existingChannel.toString()}`),
              )
              .addSeparatorComponents(
                new SeparatorBuilder()
                  .setSpacing(SeparatorSpacingSize.Small)
                  .setDivider(true),
              )
              .addTextDisplayComponents(
                new TextDisplayBuilder()
                  .setContent("-# **Já existe uma solicitação de whitelist para este jogador.**"),
              )
              .addTextDisplayComponents(
                new TextDisplayBuilder()
                  .setContent("-# **Aguarde a análise dos administradores.**"),
              ),
          ];

          await interaction.reply({
            components: duplicateRequestComponents,
            flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
          });
          
          this.logger.log(`⚠️ ${interaction.user.username} tentou criar solicitação duplicada para ${nickname} - canal ${existingChannel.name} já existe`);
          return;
        }

        const channelName = `${nickname.toLowerCase()}`;
        const channel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: category.id,
          topic: `Solicitação de whitelist para ${nickname} por ${interaction.user.username}`
        });

        const components = [
          new ContainerBuilder()
            .setAccentColor(16711680)
            .addSeparatorComponents(
              new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
                .setDivider(true),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent("-# 📝 Nova Solicitação de Whitelist"),
            )
            .addSeparatorComponents(
              new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
                .setDivider(true),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent(`-# 🎮 **Nickname Minecraft:** \`${nickname}\``),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent(`-# 👤 **Usuário Discord:** ${interaction.user.toString()}`),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent(`-# 🆔 **ID Discord:** \`${interaction.user.id}\``),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent(`-# 📅 **Data da Solicitação:** <t:${Math.floor(Date.now() / 1000)}:F>`),
            )
            .addSeparatorComponents(
              new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
                .setDivider(true),
            )
            .addTextDisplayComponents(
              new TextDisplayBuilder()
                .setContent("-# **Clique nos botões abaixo para gerenciar a solicitação:**"),
            )
            .addActionRowComponents(
              new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .addComponents(
                  new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("aprovar")
                    .setCustomId(`approve-${channel.id}`),
                  new ButtonBuilder()
                    .setStyle(ButtonStyle.Danger)
                    .setLabel("negar")
                    .setCustomId(`deny-${channel.id}`),
                ),
            ),
        ];

        await channel.send({
          components: components,
          flags: MessageFlags.IsComponentsV2
        });

        await channel.send({
          content: "@here",
        });

        await interaction.reply({
          content: `✅ **Solicitação de Whitelist Enviada!**\n\n🎮 **Nickname:** \`${nickname}\`\n📧 **Canal:** ${channel.toString()}\n\n⏳ Sua solicitação foi criada e enviada para os administradores. Aguarde a aprovação!`,
          flags: MessageFlags.Ephemeral
        });

        this.logger.log(`📝 Solicitação de whitelist criada: ${nickname} (${interaction.user.username}) - Canal: ${channel.name}`);

      } catch (error) {
        this.logger.error('Erro ao criar solicitação de whitelist:', error);
        await interaction.reply({
          content: '❌ **Erro:** Não foi possível criar a solicitação. Tente novamente mais tarde.',
          flags: MessageFlags.Ephemeral
        });
      }
    }
  }
} 