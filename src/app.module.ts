import { ProductKeyController } from '@controllers/product-key.controller';
import { StaticController } from '@controllers/static.controller';
import { ProductKey } from '@entity/product-key.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductKeyService } from '@services/product-key.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'oracle',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 1521,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            sid: process.env.DB_SID,
            entities: [
                ProductKey
            ],
            synchronize: process.env.NODE_ENV != 'production',
            dropSchema: process.env.NODE_ENV != 'production',
            logging: true
        }),
        TypeOrmModule.forFeature([
            ProductKey
        ])
    ],
    controllers: [StaticController, ProductKeyController],
    providers: [ProductKeyService]
})

export class AppModule {
}