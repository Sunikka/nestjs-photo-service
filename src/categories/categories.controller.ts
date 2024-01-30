import { Body, Controller, Post, Get,Request, UseGuards, Delete, Patch, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService : CategoriesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)

    async createCategory(
        @Body() createCategoryDto : CreateCategoryDto
    ): Promise<Category> {
        return await this.categoriesService.insertCategory(createCategoryDto);
    }

    @Get()
    async getCategories() : Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async removeCategory(@Param('id') id : string ) {
        console.log("Deleting a category")
        return await this.categoriesService.remove(id)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateCategory(@Param('id') id : string, @Body() updateCategoryDto:UpdateCategoryDto) {
        console.log("Updating a category");
        return await this.categoriesService.update(id, updateCategoryDto)
    }
    
}
