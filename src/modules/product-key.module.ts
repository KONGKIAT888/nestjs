import { ProductController } from '@controllers/product.controller';
import { ProductKey } from '@entity/product-key.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductKeyService } from '@services/product-key.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductKey])],
    controllers: [ProductController],
    providers: [ProductKeyService]
})
export class ProductKeyModule {
}