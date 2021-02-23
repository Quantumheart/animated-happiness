import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {ApplicationUser} from "../../entity/application-user.entity";
import * as bcrypt from 'bcrypt';
import {PostgresError} from "../../database/postgres-error";
import {ConfigService} from "@nestjs/config";
import CreateUserDto from "../../models/user/create-user-dto";
import {TokenPayload} from "../../models/misc/token-payload";
import {CommandBus} from "@nestjs/cqrs";
import {AuthenticateUserCommand} from "./authenticate-user.command";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService,
                private configService: ConfigService, private readonly commandBus: CommandBus) {
    }

    public async authenticateUser(email: string, password: string): Promise<ApplicationUser> {
        return this.commandBus.execute(new AuthenticateUserCommand(email, password));
    }

    public async register(user: CreateUserDto): Promise<ApplicationUser> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        try {
            const createdUser = await this.usersService.addApplicationUser({
                ...user,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresError.UniqueViolation) {
                throw new HttpException('User with that email or friend code already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return this.usersRepository.addApplicationUser(user);
    }

    public async deleteUser(userId: string): Promise<void> {
        return this.usersService.removeById(userId);
    }

    public getCookieWithJwtToken(userId: string): string {
        const payload: TokenPayload = {userId};
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut(): string {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
