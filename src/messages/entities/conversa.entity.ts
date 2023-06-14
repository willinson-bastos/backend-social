import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
import { IsString } from 'class-validator';

@Entity()
export class Conversa {

  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ length: 255 })
  name: string;

  @IsString()
  @Column({ length: 255 })
  text: string;

}