import { Module } from '@nestjs/common';
import { PingCommand } from './ping.command';
import { UserInfoCommand } from './user-info.command';
import { ServerInfoCommand } from './server-info.command';
import { WhitelistPanel } from './mcwhitelist';

@Module({
  providers: [PingCommand, UserInfoCommand, ServerInfoCommand, WhitelistPanel],
})
export class CommandsModule {} 