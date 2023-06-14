import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';


@Controller('home')
export class PostController {
    constructor(private readonly postService: PostService) { }


    @Post()
    async criar(@Body() data: PostDto): Promise<PostEntity> {
        //console.log('post executado');
        return this.postService.criarPost(data);
    }

    @Get('posts')
    async listar(): Promise<PostEntity[]> {
        //console.log('get executado');
        return this.postService.listarPost();
    }

    @Delete(':id')
    async deletar(@Param('id') id: number): Promise<void> {
    try{
        //console.log('delete executado backend');
        return this.postService.deletarPost(id);
    } catch(error){
        console.error('Erro ao excluir post', error);
        throw new HttpException('Erro ao excluir o post', HttpStatus.INTERNAL_SERVER_ERROR);
    }

        
    }


}
