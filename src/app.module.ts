import { CategoryController } from '@controllers/category.controller';
import { ProductController } from '@controllers/product.controller';
import { StaticController } from '@controllers/static.controller';
import { Category } from '@entity/category.entity';
import { Product } from '@entity/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '@services/category.service';
import { ProductService } from '@services/product.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'oracle',
            host: 'localhost',
            port: 1521,
            username: 'som',
            password: 'som',
            database: 'LACONIC',
            sid: 'LACONIC',
            entities: [
                Product,
                Category
            ],
            synchronize: process.env.NODE_ENV != 'production',
            // dropSchema: true,
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