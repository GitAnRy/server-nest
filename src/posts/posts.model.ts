import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity({name: `posts`})
export class Post {
    @ApiProperty({example: `1`, description: `ID поста`})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: `Заголовок`, description: `Название поста`})
    @Column({type: "varchar"})
    title: string;

    @ApiProperty({example: `Описание`, description: `Описание поста`})
    @Column({type: "varchar"})
    content: string;

    @ApiProperty({example: `filename`, description: `Путь к изображению`})
    @Column({type: "varchar"})
    image: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

}