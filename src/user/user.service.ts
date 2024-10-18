import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user/user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    create(user: Partial<User>) {
        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    update(id: number, updateUser: Partial<User>) {
        return this.userRepository.update(id, updateUser);
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }
}
