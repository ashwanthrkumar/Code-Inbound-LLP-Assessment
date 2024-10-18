import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user/user';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Adjust the import path as necessary

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()  // Registration endpoint (can be public)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)  // Protecting the findAll route
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)  // Protecting the findOne route
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)  // Protecting the update route
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUser: Partial<User>) {
        return this.userService.update(+id, updateUser);
    }

    @UseGuards(JwtAuthGuard)  // Protecting the remove route
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
