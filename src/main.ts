import { AppModule } from '@app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

void bootstrap().then(r => console.log('Application is running on: http://localhost:3000'));
