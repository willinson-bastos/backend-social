import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { MessagesModule } from './messages/messages.module';






@Module({
  imports: [AuthModule, PostModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {

}
