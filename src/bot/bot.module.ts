import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IntentsBitField } from 'discord.js';
import { BotService } from './bot.service';
import { CommandsModule } from '../commands/commands.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('DISCORD_BOT_TOKEN'),
        intents: [
          IntentsBitField.Flags.Guilds,
          IntentsBitField.Flags.GuildMessages,
          IntentsBitField.Flags.MessageContent,
          IntentsBitField.Flags.GuildMembers,
        ],
        development: [
          configService.get<string>('DEV_GUILD_ID'),
        ].filter(Boolean),
      }),
      inject: [ConfigService],
    }),
    CommandsModule,
    EventsModule,
  ],
  providers: [BotService],
})
export class BotModule {} 