import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/users/entities/profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/create-profile-dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private profilesRepository: Repository<Profile>) {}
    
    async insertProfile(gender: string, photo: string) {
        const profile = new Profile();

        profile.gender = gender;
        profile.photo = photo;
        console.log(`Saving profile: ${JSON.stringify(profile)}`)
        return await this.profilesRepository.save(profile);
    }

    async findProfileById(id ) :  Promise<Profile>{
        return await this.profilesRepository.findOneBy({id : Number(id)})
    }

    async updateProfile(id: number , updatedProfileDto : UpdateProfileDto) {
        const profile = await this.findProfileById(id)
        
        if(!profile) {
            throw new NotFoundException("No profile found")
        }

        console.log(`Updating profile: ${profile.id}`)

        // Update 
        profile.gender = updatedProfileDto.gender
        profile.photo = updatedProfileDto.photo

        await this.profilesRepository.save(profile)
    }
}
