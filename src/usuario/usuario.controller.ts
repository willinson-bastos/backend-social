import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService, private authService: AuthService){}

    //@UseGuards(JwtAuthGuard)
    @Get('listar')
    async listar(): Promise<Usuario[]>{
        return this.usuarioService.listar();
    }

    @Get(':id')
    async listarUmId(@Param('id') id: number):Promise<Usuario>{
        return this.usuarioService.listarUmId(id);
    }
    
    @Get()
    async listarUmEmail(@Param('email') email:string):Promise<Usuario>{
        return this.usuarioService.listarUmEmail(email);
    }

    @Post()
    async cadastrar(@Body() data: UsuarioCadastrarDto): Promise<ResultadoDto>{
        return this.usuarioService.cadastrar(data);
    }

    @Put(':id')
    async atualizar(@Param('id')id: number,@Body() usuario:UsuarioCadastrarDto):Promise<UsuarioCadastrarDto>{
        return this.usuarioService.atualizar(id, usuario);
    }

    @Delete(':id')
    async deletar(@Param('id') id:number):Promise<void>{
        return this.usuarioService.deletar(id);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }
}