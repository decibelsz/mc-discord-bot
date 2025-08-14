import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';

@Injectable()
export class MessageEvent {
  private readonly logger = new Logger(MessageEvent.name);

  @On('messageCreate')
  public onMessage(@Context() [message]: ContextOf<'messageCreate'>) {
    if (message.author.bot) return;

    this.logger.debug(`📝 Mensagem de ${message.author.username}: ${message.content}`);
  }
} 