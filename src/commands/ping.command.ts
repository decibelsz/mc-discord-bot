import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class PingCommand {
  @SlashCommand({
    name: 'ping',
    description: 'Responde com pong!',
  })
  public async onPing(@Context() [interaction]: SlashCommandContext) {
    const start = Date.now();
    
    await interaction.reply({
      content: '🏓 Pong!',
      ephemeral: true,
    });
    
    const end = Date.now();
    const latency = end - start;
    
    await interaction.editReply({
      content: `🏓 Pong! Latência: ${latency}ms`,
    });
  }
} 