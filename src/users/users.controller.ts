import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { CreateUserWithEmbeddedProfile, UpdateUserWithEmbeddedProfile } from './dto/create-user-with-embedded-profle-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    //     console.log(`createUSer:  ${JSON.stringify(createUserDto)}`)
    //     return await this.usersService.insertUser(createUserDto);
    // }

    @Post()
    @UseGuards(JwtAuthGuard)     
    async createUserWithEmbeddedProfile(@Body() createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfile): Promise<User> {
        console.log(`createUSer:  ${JSON.stringify(createUserWithEmbeddedProfile)}`)
        return await this.usersService.insertUserWithEmbeddedProfile(createUserWithEmbeddedProfile);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Delete(':id') 
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id : string) {
        console.log("Deleting an user")
        return await this.usersService.remove(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id')id: string,@Body() updateUserDto: UpdateUserWithEmbeddedProfile) {
        console.log("Updating an user")
        return await this.usersService.update(id, updateUserDto)
    }

}
