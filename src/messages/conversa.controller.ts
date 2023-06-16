import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Conversa } from './entities/conversa.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';



@Controller('chat')
export class ConversaController {
    constructor(private readonly messagesService: MessagesService) { }


    @Post()
    async newMessage(@Body() data: CreateMessageDto){
        return this.messagesService.newMessage(data);
    }
   
    @Get()
    async listMessages(): Promise<Conversa[]> {
        return this.messagesService.listMessages();
    }


    


}
