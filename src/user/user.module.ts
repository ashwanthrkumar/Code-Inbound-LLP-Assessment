// user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service'; // Adjust the path if necessary
import { User } from './entities/user/user'; // Adjust the path to your entity

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService], // Export if you need to use UserService in other modules
})
export class UserModule { }
