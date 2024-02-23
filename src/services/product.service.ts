import { Category } from '@entity/category.entity';
import { Product } from '@entity/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRequest } from '@payload/request/product.request';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>
    ) {
    }

    async create(request: ProductRequest): Promise<Product> {
        const product = new Product();
        product.name = request.name;
        product.price = request.price;

        if (request.categories !== undefined) {
            const categories = await Promise.all(
                request.categories.map(async categoryId => {
                    return await this.categoryRepository.findOne({ where: { id: categoryId } });
                })
            );
            product.categories = categories.filter(category => category !== undefined);
        }

        return await this.productRepository.save(product);
    }

    async update(id: number, request: ProductRequest): Promise<Product> {
        const product = await this.findById(id);
        product.name = request.name;
        product.price = request.price;

        if (request.categories !== undefined && request.categories.length > 0) {
            const categories = await Promise.all(
                request.categories.map(async categoryId => {
                    return await this.categoryRepository.findOne({ where: { id: categoryId } });
                })
            );
            product.categories = categories.filter(category => category !== undefined);
        }

        return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({
            relations: ['categories']
        });
    }

    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['categories']
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found.`);
        }
        return product;
    }

    async delete(id: number): Promise<DeleteResult> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID ${id} not found.`);
        }
        return result;
    }

}

