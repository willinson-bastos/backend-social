import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { conversaProviders } from './conversa.providers';
import { ConversaController } from './conversa.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [MessagesService, ...conversaProviders],
  controllers:[ConversaController],
  exports: [MessagesService]
})
export class MessagesModule {}
