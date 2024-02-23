import { AppModule } from '@app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
    const server = express();
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(server)
    );
    app.use(express.static(path.join('build')));
    await app.listen(3000);
}

void bootstrap().then(r => console.log('Server started'));
