import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user/user';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto'; // Import your login DTO
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService, // Inject JWT service
    ) { }

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginUserDto.email },
        });

        if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
            const payload = { email: user.email, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload), // Create and return JWT
            };
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
