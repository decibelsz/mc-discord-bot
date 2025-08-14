import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import {
  MessageFlags,
  AttachmentBuilder
} from 'discord.js';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

@Injectable()
export class InactivesCommand {
  private readonly logger = new Logger(InactivesCommand.name);

  @SlashCommand({
    name: 'inactives',
    description: 'Envia mensagem sobre inativos no grupo',
  })
  public async onInactives(@Context() [interaction]: SlashCommandContext) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    
    const videoPath = join(process.cwd(), "src/assets/video.MP4");
    
    if (!existsSync(videoPath)) {
      this.logger.error(`Arquivo de vídeo não encontrado: ${videoPath}`);
      await interaction.editReply({ 
        content: "❌ Erro: Arquivo de vídeo não encontrado!"
      });
      return;
    }
    
    this.logger.log(`Enviando vídeo: ${videoPath}`);
    this.logger.log(`Caminho completo: ${videoPath}`);
    
    try {
      const videoBuffer = readFileSync(videoPath);
      this.logger.log(`Arquivo lido como buffer, tamanho: ${videoBuffer.length} bytes`);
      
      const videoAttachment = new AttachmentBuilder(videoBuffer, { name: 'video.mp4' });
      this.logger.log(`AttachmentBuilder criado com sucesso`);

      const message = await interaction.channel.send({ 
        content: "# Aqui é grupo não é cemitério.\n\n-# - Quando for convidar alguém já pensa se a pessoa é legal pra não ter que ficar removendo um bando de ghost fdp.\n-# - **Para os membros novos:** Quer ficar? Só não some por muito tempo.\n-# Valeu é nóis 😎✌️\n\n||@everyone||",
        files: [videoAttachment]
      });

      this.logger.log(`Mensagem enviada com sucesso: ${message.id}`);
      
      await interaction.editReply({ 
        content: "✅ Mensagem sobre inativos enviada!"
      });
    } catch (error) {
      this.logger.error('Erro ao enviar mensagem:', error);
      await interaction.editReply({ 
        content: "❌ Erro ao enviar mensagem!"
      });
    }
  }
} 