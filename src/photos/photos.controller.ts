import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto, UpdatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService) {}
    
    @Post()
    @UseGuards(JwtAuthGuard)

    async createPhotoUsingEmail(
        @Body() createPhotoDto : CreatePhotoDto
    ): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @Get()
    async getPhotos() : Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    @Delete(':id') 
    @UseGuards(JwtAuthGuard)
    async removePhoto(@Param('id') id : string) {
        console.log("Deleting a photo")
        return await this.photosService.remove(id);
        
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updatePhoto(@Param('id') id :string, @Body() updatePhotoDto : UpdatePhotoDto) {
        console.log("Updating a photo");
        return await this.photosService.update(id, updatePhotoDto)
    }
}


