import { CategoryController } from '@controllers/category.controller';
import { Category } from '@entity/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '@services/category.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {
}