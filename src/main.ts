import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('🤖 Bot do Discord está iniciando...');
  
  await app.listen(3000);
  console.log('✅ Bot do Discord iniciado com sucesso!');
}

bootstrap().catch(console.error); 