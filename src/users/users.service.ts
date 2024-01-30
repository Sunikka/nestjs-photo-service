import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserWithEmbeddedProfile, UpdateUserWithEmbeddedProfile } from './dto/create-user-with-embedded-profle-dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, 
        private readonly profilesService: ProfilesService) {}

    insertUser(createUserDto: CreateUserDto) : Promise<User> {
        const user = new User();
        user.firstname = createUserDto.firstName;
        user.lastname = createUserDto.lastName;
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        // user.profile = ....
        return this.usersRepository.save(user);
    }

    async insertUserWithEmbeddedProfile(createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile) : Promise<User> {
        const profile = await this.profilesService.insertProfile(
            createUserWithEmbeddedProfile.profile.gender,
            createUserWithEmbeddedProfile.profile.photo
        );
        
        const user = new User();
            user.firstname = createUserWithEmbeddedProfile.firstname;
            user.lastname = createUserWithEmbeddedProfile.lastname;
            user.username = createUserWithEmbeddedProfile.username;
            user.password = createUserWithEmbeddedProfile.password;
            user.profile = profile;
            console.log(`Saving ${JSON.stringify(user)}`);
            return this.usersRepository.save(user);
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ["profile"]});
    }

    async findUserByUsername(username:string) : Promise<User> {
        return await this.usersRepository.findOne({where: {username: username}});
    }

    async findUserById(id: string) : Promise<User> {
        return await this.usersRepository.findOneBy({id: Number(id)});
    }

    async remove(id : string) {
        const user = await this.findUserById(id);
        
        if(!user) {
            throw new NotFoundException("No user found with specified ID");
        }

        console.log(`Deleting user: ${user.username} `)
        this.usersRepository.delete(user)
        return {message: `Removed user by ID: ${id}`}
    }

    async update(id : string, updateUser : UpdateUserWithEmbeddedProfile) {
        const user = await this.findUserById(id)

        if(!user) {
            throw new NotFoundException("No user found with specified ID!")
        }

        console.log(`Updating user: ${user.username}`)

        // Update 
        user.username = updateUser.username
        user.password = updateUser.password
        user.firstname = updateUser.firstname
        user.lastname = updateUser.lastname
    
        if(updateUser.profile) {
            await this.profilesService.updateProfile(user.profile.id, updateUser.profile)
        }


        await this.usersRepository.save(user);
        return {message: `Successfully updated user ${id}`}
    }
}
 