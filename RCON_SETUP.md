# 🔧 Configuração do RCON para Servidor Minecraft

## 📋 O que é RCON?

RCON (Remote Console) permite que aplicações externas executem comandos no servidor Minecraft remotamente. É necessário para que o bot Discord possa executar comandos como `whitelist add` automaticamente.

**🔧 Biblioteca utilizada:** `rcon-client` (compatível com NestJS/TypeScript)

## ⚙️ Configuração no Servidor Minecraft

### 1. Editar server.properties

No arquivo `server.properties` do seu servidor, adicione/edite as seguintes linhas:

```properties
# Habilitar RCON
enable-rcon=true

# Porta RCON (padrão é 25575)
rcon.port=25575

# Senha do RCON (SUBSTITUA por uma senha segura!)
rcon.password=SuaSenhaSeguraAqui123
```

### 2. Reiniciar o Servidor

Após editar o `server.properties`, reinicie o servidor Minecraft para aplicar as mudanças.

## 🔐 Configuração no Bot

### 1. Criar arquivo .env

Copie o arquivo `config.example.env` para `.env`:

```bash
cp config.example.env .env
```

### 2. Configurar variáveis RCON

Edite o arquivo `.env` e configure:

```env
# Configurações do RCON para servidor Minecraft
RCON_HOST=168.231.89.180
RCON_PORT=25575
RCON_PASSWORD=SuaSenhaSeguraAqui123
```

⚠️ **IMPORTANTE**: Use a mesma senha que você configurou no `server.properties`!

## 🧪 Testando a Conexão

Para testar se o RCON está funcionando, você pode usar ferramentas como:

### Via Terminal (Windows):
```bash
# Instalar mcrcon (ferramenta de linha de comando)
# Depois testar conexão:
mcrcon -H 168.231.89.180 -P 25575 -p SuaSenhaSeguraAqui123 "list"
```

### Via Bot:
1. Use o comando `/mcwhitelist` no Discord
2. Clique em "whitelist"
3. Digite um nickname de teste
4. Clique em "aprovar"
5. Se der erro, verifique os logs do bot

## 🚨 Problemas Comuns

### ❌ Connection refused
- Verifique se o servidor está rodando
- Verifique se a porta 25575 está aberta no firewall
- Verifique se `enable-rcon=true` no server.properties

### ❌ Authentication failed
- Verifique se a senha no `.env` é igual à do `server.properties`
- Certifique-se de que não há espaços extras na senha

### ❌ Timeout
- Verifique se o IP está correto
- Verifique se a porta está correta
- Verifique conectividade de rede

## 🔒 Segurança

⚠️ **NUNCA** compartilhe sua senha RCON publicamente!
- Use senhas fortes
- Considere usar firewall para limitar acesso à porta RCON
- Mantenha o arquivo `.env` no `.gitignore`

## 📝 Comandos Suportados

O bot pode executar qualquer comando do Minecraft via RCON:
- `whitelist add <player>`
- `whitelist remove <player>`
- `ban <player>`
- `pardon <player>`
- `op <player>`
- `deop <player>`
- E muitos outros...

## 🎯 Resultado Esperado

Quando tudo estiver configurado corretamente:
1. Use `/mcwhitelist` para enviar o painel
2. Usuário solicita whitelist via Discord
3. Administrador clica em "aprovar"
4. Bot executa `whitelist add nickname` via RCON
5. Jogador é adicionado à whitelist automaticamente
6. Canal é fechado após 10 segundos

✅ **Pronto! Seu sistema de whitelist automático está funcionando!** 