import { Category } from '@entity/category.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CategoryRequest } from '@payload/request/category.request';
import { CategoryService } from '@services/category.service';

@Controller('/api/v1/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() request: CategoryRequest): Promise<Category> {
        const category = new Category();
        category.name = request.name;
        return await this.categoryService.createOrUpdate(category);
    }

    @Get()
    async getAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Category> {
        return await this.categoryService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() request: CategoryRequest): Promise<Category> {
        const category = await this.categoryService.findById(id);
        category.name = request.name || category.name;
        return await this.categoryService.createOrUpdate(category);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        await this.categoryService.delete(id);
        return { success: true };
    }
}
