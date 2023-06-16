import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TokenModule } from 'src/token/token.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports:[UsuarioModule, PassportModule, TokenModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    MessagesModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService]
})
export class AuthModule {}
