import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
    constructor(private readonly usuarioService: UsuarioService,
       private jwtService: JwtService,
        private tokenService: TokenService
    ){}

    async validarUsuario(email: string, senha: string): Promise<any> {
        const usuario = await this.usuarioService.listarUmEmail(email);
        if (usuario && bcrypt.compareSync(senha, usuario.senha) ) {
            const {senha, ...result} = usuario;
            return result;
        }
        
        // TODO: Generate a JWT and return it here
        // instead of the user object
          return null;
      }


      async login(usuario:any) {
        const payload = { sub: usuario.id, email: usuario.email };
        const token = this.jwtService.sign(payload);
        console.log(token);
        this.tokenService.save(token, usuario.email);
        return {
          access_token: token,
          user: usuario
        };
      }
}
