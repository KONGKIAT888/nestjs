import { ProductKey } from '@entity/product-key.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductKeyService } from '@services/product-key.service';

@Controller('/api/v1/product-key')
export class ProductKeyController {
    constructor(private readonly productKeyService: ProductKeyService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() request: ProductKey): Promise<ProductKey> {
        return await this.productKeyService.create(request);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: number, @Body() request: ProductKey): Promise<ProductKey> {
        return await this.productKeyService.update(id, request);
    }

    @Get()
    async getAll(): Promise<ProductKey[]> {
        return await this.productKeyService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<ProductKey> {
        const productKey = await this.productKeyService.findById(id);
        if (!productKey) {
            throw new NotFoundException('Product Key not found');
        }
        return productKey;
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        await this.productKeyService.delete(id);
        return { success: true };
    }


}
