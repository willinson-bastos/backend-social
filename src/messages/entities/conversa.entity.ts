import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class Conversa {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  idSender: number;

  @Column()
  idReceiver: number;

  @IsString()
  @Column({ length: 255 })
  text: string;

}