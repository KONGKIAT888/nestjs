import { CategoryController } from '@controllers/category.controller';
import { ProductController } from '@controllers/product.controller';
import { StaticController } from '@controllers/static.controller';
import { Category } from '@entity/category.entity';
import { Product } from '@entity/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';
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
                Product,
                Category
            ],
            synchronize: process.env.NODE_ENV != 'production',
            dropSchema: process.env.NODE_ENV != 'production',
            logging: true
        }),
        TypeOrmModule.forFeature([
            Product,
            Category
        ])
    ],
    controllers: [StaticController, ProductController, CategoryController],
    providers: [ProductService, CategoryService]
})

export class AppModule {
}