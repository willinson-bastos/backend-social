import { Injectable, Inject, HttpException, HttpStatus, forwardRef} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
    constructor(
        @Inject('TOKEN_REPOSITORY')
        private tokenRepository: Repository<Token>,
        private usuarioService: UsuarioService,
        @Inject(forwardRef(()=>AuthService))
        private authService: AuthService
    ) { }

    async save(hash: string, email: string){
            let objToken = await this.tokenRepository.findOne({where:{email:email}});
        if(objToken){
            this.tokenRepository.update(objToken.id, {hash: hash});
        }else{
            try{
                this.tokenRepository.insert({hash: hash, email: email});
            } catch(error){
                console.error("Erro ao inserir token.");
            }
        }
        
    }

    async refreshToken(oldToken:string){
        let objToken = await this.tokenRepository.findOne({where:{hash:oldToken}});
        if(objToken){
            let usuario = await this.usuarioService.listarUmEmail(objToken.email);
            return this.authService.login(usuario);
        }
            return new HttpException({
                errorMessage: 'Token Inválido'
            }, HttpStatus.UNAUTHORIZED);
        
    }

}
