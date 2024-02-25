import { AppModule } from '@app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
    dotenv.config();
    const server = express();
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(server)
    );
    app.enableCors({
        origin: false,
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization']
    });
    app.use(express.static(path.join('client')));
    await app.listen(Number(process.env.SERVER_PORT) || 3000);
}

void bootstrap().then(r => {
    console.log(`Server is running on port ${process.env.SERVER_PORT} 🚀`);
    console.log(`Server running as ${process.env.NODE_ENV} mode`);
});