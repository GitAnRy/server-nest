import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.model';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
                private fileService: FilesService, 
                private userService: UsersService) {}

    async create(dto: CreatePostDto, image: Express.Multer.File) {
        const filename = await this.fileService.createFile(image);
        const user = await this.userService.getUserById(dto.userId);
        const post = await this.postRepository.save({...dto, image: filename, user: user});
        return post;
    }
}
