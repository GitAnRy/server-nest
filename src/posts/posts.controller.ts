import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

    constructor(private postSevice: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
                @UploadedFile() image: Express.Multer.File) {
        return this.postSevice.create(dto, image);
    }
}
