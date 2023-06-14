import { Injectable, Inject } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Conversa } from './entities/conversa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  messages: Message[] = [{name: 'Servidor', text: 'Mensagem inicial do server, olá!'}];
  clientToUser = {};

  constructor(
    @Inject('CHAT_REPOSITORY')
  private chatRepository: Repository<Conversa>,
  ){}

  identify(name: string, clientId: string){
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  create(createMessageDto: CreateMessageDto) {
    const message = {...createMessageDto};
    this.messages.push(createMessageDto);//TO DO: improve
    
    return message;
  }

  findAll() {
    return this.messages;
  }

  async newMessage(messageData: CreateMessageDto): Promise<Conversa>{
    let messageInChat = new Conversa();
    messageInChat.name = messageData.name;
    messageInChat.text = messageData.text;
    return await this.chatRepository.save(messageInChat);
  }

  async listMessages():Promise<Conversa[]>{
    return await this.chatRepository.find();
  }
  
}
