import {AuthenticateUserCommand} from "./authenticate-user.command";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UsersService} from "../users/users.service";
import {ApplicationUser} from "../../entity/application-user.entity";
import * as bcrypt from "bcrypt";
import {HttpException, HttpStatus} from "@nestjs/common";

@CommandHandler(AuthenticateUserCommand)
export class AuthenticateUserCommandHandler implements ICommandHandler<AuthenticateUserCommand> {
    constructor(private repository: UsersService) {
    }

    async execute(command: AuthenticateUserCommand): Promise<ApplicationUser> {
        try {
            const {email, password} = command;
            const user: ApplicationUser = await this.repository.findByEmail(email);

            const isPasswordMatching = await bcrypt.compare(
                password,
                user.password
            );
            if (isPasswordMatching) {
                user.userAuthenticated();
                user.commit();
                return user;
            }
        } catch (ex) {
            throw new HttpException('Incorrect credentials', HttpStatus.BAD_REQUEST);
        }
    }
}