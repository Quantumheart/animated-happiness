import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody
} from '@nestjs/websockets';
import {FindPokemon} from "../models/pokemon/pokemon-dto";

@WebSocketGateway()
export class MatcherGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: { emit: (arg0: string, arg1: number) => void; };
    users = 0;

    async handleConnection(): Promise<void> {

        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('starting match', this.users);
        console.log('user connected');
    }

    async handleDisconnect(): Promise<void> {

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }
    
    @SubscribeMessage('startMatch')
    handleEvent(@MessageBody() data: FindPokemon): string {
        console.log('start match hit');
        console.log('data', data);
        // todo find user with pokemon
        return '';
    }
}

