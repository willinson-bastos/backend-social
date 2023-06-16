import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from 'src/messages/messages.service';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({ cors: { origin: 'http://localhost:4200', credentials: true } } )
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer()
    server: Server;

    constructor(private readonly messagesService: MessagesService){}

    afterInit(server: Server) {
    }

    handleConnection(socket: Socket, ...args: any[]) {
    }

    handleDisconnect(socket: Socket) {
    }

    @SubscribeMessage('loginChat')
    async login(socket: Socket, id: number) {
        this.messagesService.login(socket, id);
    }

    @SubscribeMessage('logoutChat')
    async logout(socket: Socket, id: number) {
        this.messagesService.logout(socket, id);
    }

}