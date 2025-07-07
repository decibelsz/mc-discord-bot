import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';

@Injectable()
export class ReadyEvent {
  private readonly logger = new Logger(ReadyEvent.name);

  @On('ready')
  public onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`🚀 Bot ${client.user.username} está online!`);
    this.logger.log(`📊 Conectado a ${client.guilds.cache.size} servidor(es)`);
    this.logger.log(`👥 Servindo ${client.users.cache.size} usuário(s)`);
  }
} 