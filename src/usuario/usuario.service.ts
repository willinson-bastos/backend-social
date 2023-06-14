import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { error } from 'console';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async listar(): Promise<Usuario[]> {
        return this.usuarioRepository.find({select: ["id", "nome","email"]});//filtra para exibir apenas as propriedades do select
    }

    async cadastrar(data: UsuarioCadastrarDto): Promise<any> {
        let usuario = new Usuario();
        usuario.nome = data.nome;
        usuario.email = data.email;
        usuario.senha = bcrypt.hashSync(data.senha, 8);

        console.log(usuario);
        return await this.usuarioRepository.save(usuario);
            /*.then((result) => {
                return <ResultadoDto>{
                    status: true,
                    mensagem: "Usuário cadastrado com sucesso!"
                }
            })
            .catch((error) => {
                return <ResultadoDto>{
                    status: false,
                    mensagem: "Erro ao cadastrar usuário!"
                }
            });*/
    }

    async listarUmEmail(email: string): Promise<Usuario | undefined> {
        return this.usuarioRepository.findOne({ where: { email } });
    }

    async listarUmId(id: number): Promise<Usuario | undefined> {
        return this.usuarioRepository.findOne({ where: { id } });
    }

    async atualizar(id: number, usuario: UsuarioCadastrarDto): Promise<Usuario> {
        const usuarioUpdate = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioUpdate) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        usuarioUpdate.nome = usuario.nome;
        usuarioUpdate.email = usuario.email;
        usuarioUpdate.senha = bcrypt.hashSync(usuario.senha, 8);
        console.log(usuarioUpdate);
        return await this.usuarioRepository.save(usuarioUpdate);
    }

    async deletar(id: number): Promise<void> {
        const usuarioDelete = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioDelete) {
            throw new NotFoundException('Usuário não encontrado!');
        }
        console.log('Usuário deletado.');
        await this.usuarioRepository.delete(id);
    }


}
