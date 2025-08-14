import { Module } from '@nestjs/common';
import { PingCommand } from './ping.command';
import { UserInfoCommand } from './user-info.command';
import { ServerInfoCommand } from './server-info.command';
import { WhitelistPanel } from './mcwhitelist';
import { InactivesCommand } from './inactives.command';
import { RconService } from '../services/rcon.service';

@Module({
  providers: [PingCommand, UserInfoCommand, ServerInfoCommand, WhitelistPanel, InactivesCommand, RconService],
})
export class CommandsModule {} 