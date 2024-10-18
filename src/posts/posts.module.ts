import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.model';
import { Post } from './posts.model';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    FilesModule,
    UsersModule
  ]
})
export class PostsModule {}
