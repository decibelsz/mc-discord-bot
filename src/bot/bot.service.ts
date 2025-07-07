import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(private readonly client: Client) {}

  async onModuleInit() {
    this.logger.log('🤖 Serviço do bot inicializado');
  }

  getClient(): Client {
    return this.client;
  }

  async sendMessage(channelId: string, content: string) {
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (channel && channel.isTextBased() && 'send' in channel) {
        await channel.send(content);
      }
    } catch (error) {
      this.logger.error('Erro ao enviar mensagem:', error);
    }
  }
} 