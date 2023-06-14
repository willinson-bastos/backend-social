import { IsEmail, IsString, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ length: 100 })
  nome: string;

  @IsEmail()
  @Column({ length: 100, unique: true })
  email: string;

  @MinLength(8)
  @Column({ length: 255 })
  senha: string;

}