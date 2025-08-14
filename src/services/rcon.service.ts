import { Injectable, Logger } from '@nestjs/common';
import { Rcon } from 'rcon-client';

@Injectable()
export class RconService {
  private readonly logger = new Logger(RconService.name);

  private readonly rconConfig = {
    host: process.env.RCON_HOST || '168.231.89.180',
    port: parseInt(process.env.RCON_PORT || '25575'),
    password: process.env.RCON_PASSWORD || 'SUA_SENHA_RCON'
  };

  async checkServerStatus(): Promise<{ online: boolean; players?: number; maxPlayers?: number }> {
    try {
      const rcon = new Rcon({
        host: this.rconConfig.host,
        port: this.rconConfig.port,
        password: this.rconConfig.password
      });
      
      await rcon.connect();
      const listResult = await rcon.send('list');
      await rcon.end();
      
      let players = 0;
      let maxPlayers = 0;
      
      let match = listResult.match(/(\d+)\/(\d+)/);
      if (match) {
        players = parseInt(match[1]);
        maxPlayers = parseInt(match[2]);
      } else {
        match = listResult.match(/(\d+)\/(\d+)\s*players?/i);
        if (match) {
          players = parseInt(match[1]);
          maxPlayers = parseInt(match[2]);
        } else {
          match = listResult.match(/(\d+)\/(\d+)/);
          if (match) {
            players = parseInt(match[1]);
            maxPlayers = parseInt(match[2]);
          }
        }
      }
      
      if (players > 0 || maxPlayers > 0) {
        return { online: true, players, maxPlayers };
      }
      
      if (listResult.toLowerCase().includes('players online') || listResult.includes(':')) {
        const playerNames = listResult.split(':')[1]?.trim();
        if (playerNames && playerNames !== '') {
          const playerCount = playerNames.split(',').length;
          return { online: true, players: playerCount, maxPlayers: 20 };
        }
      }
      
      return { online: true, players: 0, maxPlayers: 20 };
    } catch (error) {
      return { online: false };
    }
  }

  async executeCommand(command: string): Promise<string> {
    try {
      const rcon = new Rcon({
        host: this.rconConfig.host,
        port: this.rconConfig.port,
        password: this.rconConfig.password
      });
      
      await rcon.connect();
      const result = await rcon.send(command);
      await rcon.end();
      
      return result;
    } catch (error) {
      this.logger.error(`Erro ao executar comando RCON '${command}':`, error);
      throw error;
    }
  }

  getConfig() {
    return this.rconConfig;
  }
} 