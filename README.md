# 🤖 Discord Bot - NestJS + Necord

Um bot do Discord moderno construído com **NestJS**, **Necord** e **TypeScript**.

## 🚀 Funcionalidades

- **Comandos Slash:**
  - `/ping` - Verifica a latência do bot
  - `/userinfo` - Mostra informações sobre um usuário
  - `/serverinfo` - Mostra informações sobre o servidor

- **Eventos:**
  - Detecção de quando o bot fica online
  - Resposta automática a mensagens "oi"

## 📋 Pré-requisitos

- Node.js 18+ 
- NPM ou Yarn
- Bot do Discord criado no Discord Developer Portal

## 🔧 Instalação

1. **Clone o repositório e instale as dependências:**
```bash
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

3. **Edite o arquivo `.env` com suas informações:**
```env
DISCORD_BOT_TOKEN=seu_token_do_bot_aqui
DEV_GUILD_ID=id_do_seu_servidor_de_teste (opcional)
NODE_ENV=development
```

## 🤖 Criando um Bot no Discord

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application"
3. Dê um nome ao seu bot e clique em "Create"
4. Vá para a seção "Bot" no menu lateral
5. Clique em "Add Bot"
6. Copie o token e cole no arquivo `.env`
7. Na seção "OAuth2" > "URL Generator":
   - Selecione "bot" e "applications.commands"
   - Selecione as permissões necessárias
   - Use a URL gerada para adicionar o bot ao seu servidor

## 🚀 Executando o Bot

### Modo de desenvolvimento:
```bash
npm run start:dev
```

### Modo de produção:
```bash
npm run build
npm run start:prod
```

## 📝 Estrutura do Projeto

```
src/
├── bot/
│   ├── bot.module.ts      # Módulo principal do bot
│   └── bot.service.ts     # Serviço do bot
├── commands/
│   ├── commands.module.ts # Módulo dos comandos
│   ├── ping.command.ts    # Comando /ping
│   ├── user-info.command.ts # Comando /userinfo
│   └── server-info.command.ts # Comando /serverinfo
├── events/
│   ├── events.module.ts   # Módulo dos eventos
│   ├── ready.event.ts     # Evento quando bot fica online
│   └── message.event.ts   # Evento de mensagens
├── app.module.ts          # Módulo principal da aplicação
└── main.ts               # Arquivo principal
```

## 🎯 Adicionando Novos Comandos

1. Crie um novo arquivo na pasta `src/commands/`
2. Use o decorador `@SlashCommand()` do Necord
3. Adicione o comando ao `commands.module.ts`

Exemplo:
```typescript
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class ExemploCommand {
  @SlashCommand({
    name: 'exemplo',
    description: 'Comando de exemplo',
  })
  public async onExemplo(@Context() [interaction]: SlashCommandContext) {
    await interaction.reply('Olá mundo!');
  }
}
```

## 📚 Recursos Úteis

- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Necord](https://necord.org/)
- [Documentação do Discord.js](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/applications)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça commit das suas mudanças
4. Faça push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 