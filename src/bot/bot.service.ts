import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  async onModuleInit() {
    this.logger.log('🤖 Serviço do bot inicializado');
  }
} 