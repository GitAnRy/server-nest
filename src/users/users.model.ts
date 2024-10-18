import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";

@Entity({name: `users`})
export class User {
    @ApiProperty({example: `1`, description: `ID пользователя`})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: `user@mail.ru`, description: `email адрес пользователя`})
    @Column({type: "varchar", unique: true})
    email: string;

    @ApiProperty({example: `1234567`, description: `Пароль`})
    @Column({type: "varchar"})
    password: string;

    @ApiProperty({example: `true`, description: `Забанен или нет`})
    @Column({type: "boolean", default: "false"})
    banned: boolean;

    @ApiProperty({example: `За хулигантсво`, description: `Причина блокировки`})
    @Column({type: "varchar", nullable: true})
    banReason: string;

    @ManyToMany(() => Role, (role) => role.users)
    roles: Role[];

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

}