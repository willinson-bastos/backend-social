import { Injectable, Inject } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Conversa } from './entities/conversa.entity';
import { Repository } from 'typeorm';
import {Socket} from 'socket.io';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {

  private users: {id:number, socket:Socket}[] = [];

  constructor(
    @Inject('CHAT_REPOSITORY')
  private chatRepository: Repository<Conversa>
  ){}

  //Login no WebSocket
  login(socket: Socket, id: number){
    console.log('loginChat');
    //console.log(socket);
    this.users = this.users.filter(user=> user.id != id);
    this.users.push({id,socket});
  }

  //Logout no WebSocket
  logout(socket: Socket, id: number){
    this.users = this.users.filter(user=> user.id != id);
  }

  //Envio via WebSocket
  sendMessage(idSender: number, idReceiver: number, message: string){
    var allUsers = this.users;
    const socketReceiver = this.users.find(user => user.id == idReceiver);
    if(!socketReceiver) return ;
    //console.log(socketReceiver);
    var fullMessage = new Message();
    fullMessage.idReceiver = idReceiver
    fullMessage.idSender = idSender
    fullMessage.text = message
    socketReceiver.socket.emit('message', fullMessage);
  }
  
  //Envio para a database
  async newMessage(messageData: CreateMessageDto): Promise<Conversa>{
    let messageInChat = new Conversa();
    messageInChat.idSender = messageData.idSender;
    messageInChat.idReceiver = messageData.idReceiver;
    messageInChat.text = messageData.text;
    this.sendMessage(messageInChat.idSender, messageInChat.idReceiver, messageInChat.text);
    return await this.chatRepository.save(messageInChat);
  }

  //Leitura da database
  async listMessages():Promise<Conversa[]>{
    return await this.chatRepository.find();
  }
  
}
