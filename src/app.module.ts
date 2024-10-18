// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'; // Adjust the path based on your structure

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'codeinbound',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Make sure to include all entities
      synchronize: true, // Use with caution in production
    }),
    UserModule,
  ],
})
export class AppModule { }
