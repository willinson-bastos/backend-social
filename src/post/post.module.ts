import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { postProviders } from './post.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PostController } from './post.controller';

@Module({
  imports:[UsuarioModule, DatabaseModule],
  providers: [
    ...postProviders,
    PostService],
  controllers: [PostController]
})
export class PostModule {

}
