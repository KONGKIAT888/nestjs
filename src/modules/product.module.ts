import { ProductController } from '@controllers/product.controller';
import { Product } from '@entity/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '@services/product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {
}