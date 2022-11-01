import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 4000;
  const DOMAIN = 'localhost';

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [/localhost/, /studio.apollographql/],
    },
  });
  await app.listen(PORT, DOMAIN, () => {
    Logger.log(`[GraphQLModule] Listening on http://${DOMAIN}:${PORT}/graphql`);
  });
}
bootstrap();
