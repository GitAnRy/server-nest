import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags(`Авторизация`)
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: `Авторизация пользователя`})
    @ApiResponse({status: 200, type: String})
    @Post(`/login`)
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: `Регистрация пользователя`})
    @ApiResponse({status: 200, type: String})
    @Post(`/registration`)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
