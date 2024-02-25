import { ProductKey } from '@entity/product-key.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductKeyService {

    constructor(
      @InjectRepository(ProductKey)
      private readonly productKeyRepository: Repository<ProductKey>
    ) {
    }

    async create(request: ProductKey): Promise<ProductKey> {
        const productKey = new ProductKey();
        productKey.productKey = request.productKey;
        productKey.expiresOn = request.expiresOn;
        return await this.productKeyRepository.save(productKey);
    }

    async update(id: number, request: ProductKey): Promise<ProductKey> {
        const productKey = await this.findById(id);
        productKey.productKey = request.productKey;
        productKey.expiresOn = request.expiresOn;
        return await this.productKeyRepository.save(productKey);
    }

    async findAll(): Promise<ProductKey[]> {
        return await this.productKeyRepository.find();
    }

    async findById(id: number): Promise<ProductKey> {
        const productKey = await this.productKeyRepository.findOne({
            where: { id }
        });
        if (!productKey) {
            throw new NotFoundException(`Product Key with ID ${id} not found.`);
        }
        return productKey;
    }

    async delete(id: number): Promise<DeleteResult> {
        const result = await this.productKeyRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product Key with ID ${id} not found.`);
        }
        return result;
    }

}

