import { Module } from '@nestjs/common';
import { ReadyEvent } from './ready.event';
import { MessageEvent } from './message.event';
import { ButtonEvent } from './button.event';
import { GuildMemberAddEvent } from './guild-member-add.event';
import { GuildMemberRemoveEvent } from './guild-member-remove.event';
import { RconService } from '../services/rcon.service';

@Module({
  providers: [ReadyEvent, MessageEvent, ButtonEvent, GuildMemberAddEvent, GuildMemberRemoveEvent, RconService],
})
export class EventsModule {} 