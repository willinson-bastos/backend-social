import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { conversaProviders } from './conversa.providers';
import { ConversaController } from './conversa.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [MessagesGateway, MessagesService, ...conversaProviders],
  controllers:[ConversaController]
})
export class MessagesModule {}
