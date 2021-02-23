import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local-strategy.service";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from "../../controllers/auth-controller/auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CqrsModule} from "@nestjs/cqrs";
import {AuthenticateUserCommandHandler} from "./authenticate-user-command.handler";
import {ConfirmEmailCommandHandler} from "./confirm-email-command.handler";
import {EmailService} from "../../services/email/email.service";

@Module({
    imports: [
        CqrsModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                },
            }),
        }),
        TypeOrmModule.forRoot()
    ],
    exports: [TypeOrmModule],
    providers: [
        AuthService,
        EmailService,
        LocalStrategy,
        JwtStrategy,
        ConfigService,
        AuthenticateUserCommandHandler,
        ConfirmEmailCommandHandler,
        
    ],
    controllers: [AuthController]
})
export class AuthModule {
}
