import { Category } from '@entity/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>
    ) {
    }

    async createOrUpdate(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id: id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found.`);
        }
        return category;
    }

    async delete(id: number): Promise<DeleteResult> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${id} not found.`);
        }
        return result;
    }

}
