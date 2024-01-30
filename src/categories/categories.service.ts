import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ) {}
    async insertCategory(createCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createCategoryDto.name;
        category.description = createCategoryDto.description;
        return await this.categoriesRepository.save(category);
    }
    async getCategories() :  Promise<Category[]>{
        return await this.categoriesRepository.find();
    }

    async findCategoryById(id : string) : Promise<Category> {
        return await this.categoriesRepository.findOneBy({id: Number(id)});
    }

    async remove(id : string) {
        const category = await this.findCategoryById(id);

        if(!category) {
            throw new NotFoundException("Category not found!");
        }
        console.log(`Removing category by id: ${id}`)

        this.categoriesRepository.delete(category);
        return {message: `Removed category: ${category.name}`}

    }

    async update(id : string,  updatedData) {
        const category = await this.findCategoryById(id);

        if(!category) {
            throw new NotFoundException("Category not found!");
        }
        console.log(`Updating category: ${category.description}`)

        // Update
        category.name = updatedData.name
        category.description = updatedData.description


        this.categoriesRepository.save(category)
        console.log(`Updated category: ${category.name}`)
        return {message: `${category.name} updated successfully`}
    }


}
