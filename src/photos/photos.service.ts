import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo) private photosRepository : Repository<Photo>,
        private usersService: UsersService,
        private categoriesService: CategoriesService
    ) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto) : Promise<Photo> {
        const user = await this.usersService.findUserByUsername(createPhotoDto.username);

        if(!user) {
            throw new NotFoundException("User not found");
        }
        console.log(`insertPhoto user found ${user.username}`);

        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;
        return await this.photosRepository.save(photo);
    }

    async findPhotoById(id : string ) : Promise<Photo> {
        return await this.photosRepository.findOneBy({id: Number(id)})
    }

    async remove(id : string) {
        const photo = await this.findPhotoById(id);

        if (!photo) {
            throw new NotFoundException("Photo not found!")
        }
        console.log(`Removing photo by id: ${id}`);

        this.photosRepository.delete(photo);
        return {message: `Removed photo by id: ${id}`}; 
    } 

    async update(id : string, updatedData)  {
        const photo = await this.findPhotoById(id)
        
        if(!photo) {
            throw new NotFoundException("No photo found")
        }
        console.log(`Updating photo with id: ${id}`)

        // Update values
        photo.name = updatedData.name
        photo.description = updatedData.description
        photo.url = updatedData.url
        photo.user = updatedData.user
        photo.categories = updatedData.categories

        this.photosRepository.save(photo)
        console.log(`Updated photo: ${photo.name}`)

        return {message: `Photo ${photo.name} updated successfully`}

    }




    @UseGuards(JwtAuthGuard)
    async getPhotos(): Promise<Photo[]> {
        return this.photosRepository.find({relations: ["user"]});
    }

}
