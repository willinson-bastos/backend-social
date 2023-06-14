import { IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nomeUsuario: string;

  @Column({ length: 100 })
  emailUsuario: string;
  
  @IsString()
  @Column({length: 100})
  titulo: string;

  @Column({length: 100})
  data: string;

  @IsString()
  @Column({ length: 255 })
  texto: string;

}