import { Product } from '@entity/product.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductRequest } from '@payload/request/product.request';
import { ProductService } from '@services/product.service';

@Controller('/api/v1/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() request: ProductRequest): Promise<Product> {
        return await this.productService.create(request);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: number, @Body() request: ProductRequest): Promise<Product> {
        return await this.productService.update(id, request);
    }

    @Get()
    async getAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Product> {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        await this.productService.delete(id);
        return { success: true };
    }


}
