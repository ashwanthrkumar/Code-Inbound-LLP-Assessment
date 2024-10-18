import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user: Partial<User> = { name: 'John', email: 'john@example.com', password: 'password' };
    jest.spyOn(repo, 'save').mockResolvedValue(user as User);

    expect(await service.create(user)).toEqual(user);
  });

  // Add additional tests for findAll, findOne, update, and remove methods.
});
