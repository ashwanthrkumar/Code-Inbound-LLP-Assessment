import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user/user';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUser: Partial<User>) {
        return this.userService.create(createUser);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUser: Partial<User>) {
        return this.userService.update(+id, updateUser);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
