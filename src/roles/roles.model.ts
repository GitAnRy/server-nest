import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity({name: `roles`})
export class Role {
    @ApiProperty({example: `1`, description: `ID пользователя`})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: `ADMIN`, description: `Уникальное значение роли`})
    @Column({type: "varchar", unique: true})
    value: string;

    @ApiProperty({example: `Администратор`, description: `Описание роли`})
    @Column({type: "varchar"})
    description: string;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable()
    users: User[];
}