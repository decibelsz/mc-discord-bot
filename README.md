# 🤖 Minecraft Discord Admin Bot

**Bot do Discord para administração automática de servidores Minecraft**

Um bot moderno e completo construído com **NestJS**, **Necord** e **TypeScript** que facilita a gestão de servidores Minecraft através do Discord. Oferece sistema automatizado de whitelist, integração RCON para execução de comandos remotos e interface interativa para administradores.

## 🚀 Funcionalidades Principais

### 📋 **Sistema de Whitelist Automático**
- **Painel interativo** com botões para solicitar whitelist
- **Verificação automática** se o jogador já está na whitelist
- **Criação automática de canais** para cada solicitação
- **Aprovação/Negação** com botões para administradores
- **Execução automática** de comandos via RCON
- **Fechamento automático** de canais após decisão

### 🔧 **Integração RCON**
- **Conexão segura** com servidor Minecraft via RCON
- **Execução de comandos** remotos no servidor
- **Verificação de status** da whitelist
- **Logs detalhados** de todas as operações
- **Tratamento de erros** com mensagens informativas

### 🎯 **Comandos Slash**
- **`/ping`** - Verifica latência do bot
- **`/userinfo`** - Mostra informações detalhadas do usuário
- **`/serverinfo`** - Mostra informações completas do servidor Discord
- **`/mcwhitelist`** - Exibe painel de whitelist do Minecraft

### 🎪 **Eventos Automáticos**
- **Bot Online** - Logs quando o bot fica online
- **Monitoramento de mensagens** - Sistema de logs opcional
- **Interações com botões** - Gerenciamento completo de whitelist
- **Modais interativos** - Formulários para coleta de dados

### 🎨 **Interface Moderna**
- **Discord Components v2** - Interface visual avançada
- **Embeds personalizados** - Mensagens ricas e informativas
- **Botões interativos** - Ações com um clique
- **Modais responsivos** - Formulários elegantes
- **Mensagens temporárias** - Privacidade com mensagens ephemeral

## 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **NPM** ou **Yarn**
- **Bot do Discord** criado no Discord Developer Portal
- **Servidor Minecraft** com RCON habilitado
- **Categoria "whitelist_minecraft"** no servidor Discord

## 🔧 Instalação

### 1. **Clone e instale dependências**
```bash
git clone <repositorio>
cd minecraft-discord-admin
npm install
```

### 2. **Configure variáveis de ambiente**
```bash
cp config.example.env .env
```

### 3. **Edite o arquivo `.env`**
```env
# Token do bot do Discord
DISCORD_BOT_TOKEN=seu_token_aqui

# ID do servidor de desenvolvimento (opcional)
DEV_GUILD_ID=id_do_servidor_discord

# Ambiente de execução
NODE_ENV=development

# Configurações do RCON para servidor Minecraft
RCON_HOST=ip_do_servidor_minecraft
RCON_PORT=25575
RCON_PASSWORD=senha_rcon_aqui
```

### 4. **Configure o servidor Minecraft**
No arquivo `server.properties`:
```properties
enable-rcon=true
rcon.port=25575
rcon.password=sua_senha_rcon
```

### 5. **Configure o Discord**
- Crie uma categoria chamada **"whitelist_minecraft"**
- Adicione o bot ao servidor com permissões necessárias
- Configure as permissões adequadas para a categoria

## 🤖 Criando um Bot no Discord

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application"
3. Dê um nome ao bot e clique em "Create"
4. Vá para a seção "Bot" no menu lateral
5. Clique em "Add Bot"
6. **Copie o token** e cole no arquivo `.env`
7. Na seção "OAuth2" > "URL Generator":
   - Selecione **"bot"** e **"applications.commands"**
   - Selecione as permissões necessárias:
     - `Send Messages`
     - `Manage Channels`
     - `Create Public Threads`
     - `Send Messages in Threads`
     - `Use Slash Commands`
     - `Embed Links`
     - `Attach Files`
     - `Read Message History`
     - `Mention Everyone`
8. Use a URL gerada para adicionar o bot ao servidor

## 🚀 Executando o Bot

### **Desenvolvimento:**
```bash
npm run start:dev
```

### **Produção:**
```bash
npm run build
npm run start:prod
```

### **Outros comandos:**
```bash
npm run lint          # Verificar código
npm run format        # Formatar código
npm run test          # Executar testes
```

## 📝 Estrutura do Projeto

```
src/
├── 📁 bot/
│   ├── bot.module.ts      # Módulo principal do bot
│   └── bot.service.ts     # Serviços do bot
├── 📁 commands/
│   ├── commands.module.ts # Módulo dos comandos
│   ├── ping.command.ts    # Comando /ping
│   ├── user-info.command.ts # Comando /userinfo
│   ├── server-info.command.ts # Comando /serverinfo
│   └── welcome.command.ts # Comando /mcwhitelist
├── 📁 events/
│   ├── events.module.ts   # Módulo dos eventos
│   ├── ready.event.ts     # Evento quando bot fica online
│   ├── message.event.ts   # Evento de mensagens
│   └── button.event.ts    # Evento de botões e modais
├── 📁 assets/
│   ├── logo.png          # Logo do projeto
│   ├── logo.gif          # Logo animado
│   └── README.md         # Documentação dos assets
├── app.module.ts         # Módulo principal da aplicação
└── main.ts              # Arquivo principal
```

## 🎯 Como Funciona o Sistema de Whitelist

### **1. Solicitação pelo Jogador**
1. Admin usa `/mcwhitelist` para enviar o painel
2. Jogador clica no botão **"whitelist"**
3. Modal aparece solicitando o nickname do Minecraft
4. Sistema verifica se já está na whitelist
5. Cria canal específico para a solicitação

### **2. Análise pelo Administrador**
1. Canal é criado na categoria "whitelist_minecraft"
2. Administradores recebem notificação
3. Painel com botões **"aprovar"** e **"negar"**
4. Informações completas do solicitante

### **3. Execução Automática**
1. **Aprovar**: Executa `whitelist add <nickname>` via RCON
2. **Negar**: Fecha o canal imediatamente
3. Logs detalhados de todas as operações
4. Canal é fechado automaticamente

### **4. Verificações de Segurança**
- ✅ Verifica se jogador já está na whitelist
- ✅ Evita solicitações duplicadas
- ✅ Valida conexão RCON
- ✅ Trata erros com mensagens claras

## 🔧 Comandos Disponíveis

### **`/ping`**
- **Função**: Verifica latência do bot
- **Resposta**: Latência em milissegundos
- **Privado**: Sim (ephemeral)

### **`/userinfo`**
- **Função**: Mostra informações do usuário
- **Inclui**: Avatar, data de criação, cargos, data de entrada
- **Formato**: Embed rico com informações detalhadas

### **`/serverinfo`**
- **Função**: Mostra informações do servidor Discord
- **Inclui**: Nome, membros, canais, cargos, dono, data de criação
- **Formato**: Embed rico com estatísticas

### **`/mcwhitelist`**
- **Função**: Exibe painel de whitelist do Minecraft
- **Inclui**: Botão para IP do servidor e botão para whitelist
- **Interface**: Components v2 com design moderno

## 🔒 Segurança

### **Proteção de Secrets**
- ✅ Arquivo `.env` no `.gitignore`
- ✅ Senhas RCON protegidas
- ✅ Tokens Discord seguros

### **Validações**
- ✅ Verificação de permissões
- ✅ Validação de entrada do usuário
- ✅ Tratamento de erros RCON
- ✅ Logs de segurança

### **Boas Práticas**
- ✅ Mensagens ephemeral para dados sensíveis
- ✅ Limpeza automática de canais
- ✅ Verificação de duplicatas
- ✅ Timeouts para operações

## 🚨 Solução de Problemas

### **❌ Erro de Conexão RCON**
```
Verifique se:
• Servidor Minecraft está rodando
• RCON está habilitado no server.properties
• Porta 25575 está aberta
• Senha RCON está correta
```

### **❌ Bot não responde**
```
Verifique se:
• Token do Discord está correto
• Bot tem permissões no servidor
• Comandos estão registrados
• Bot está online
```

### **❌ Categoria não encontrada**
```
• Crie uma categoria "whitelist_minecraft"
• Dê permissões ao bot na categoria
• Reinicie o bot
```

### **❌ Comandos não aparecem**
```
• Aguarde até 1 hora para sincronização
• Verifique se DEV_GUILD_ID está correto
• Reinicie o Discord
```

## 📚 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js
- **[Necord](https://necord.org/)** - Discord.js para NestJS
- **[Discord.js](https://discord.js.org/)** - Biblioteca do Discord
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem tipada
- **[RCON Client](https://www.npmjs.com/package/rcon-client)** - Cliente RCON

## 🎨 Exemplos de Uso

### **Adicionando Novo Comando**
```typescript
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

### **Adicionando Novo Evento**
```typescript
@Injectable()
export class ExemploEvent {
  @On('guildMemberAdd')
  public onMemberJoin(@Context() [member]: ContextOf<'guildMemberAdd'>) {
    console.log(`${member.user.username} entrou no servidor!`);
  }
}
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **Discord.js** - Pela excelente biblioteca
- **NestJS** - Pelo framework robusto
- **Necord** - Pela integração perfeita
- **Comunidade Open Source** - Por todo o suporte

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!** 