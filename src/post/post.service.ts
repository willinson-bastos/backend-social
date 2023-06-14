import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private postRepository: Repository<PostEntity>,
    ) { }

    async criarPost(postData: PostDto): Promise<PostEntity> {
        let post = new PostEntity();

        post.nomeUsuario = postData.nomeUsuario;
        post.emailUsuario = postData.emailUsuario;
        post.titulo = postData.titulo;
        post.data = postData.data;
        post.texto = postData.texto;

        console.log('post:',post);
        return this.postRepository.save(post);
    }

    async listarPost(): Promise<PostEntity[]> {
        //console.log('listar do postService')
        return await this.postRepository.find();
    }

    async deletarPost(id: number): Promise<void> {//verificar aqui
        
        const postDelete = await this.postRepository.findOne({ where: { id } });
        if (!postDelete) {
            throw new NotFoundException('O post não existe!');
        }
        await this.postRepository.delete(id);
    }
}
