
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApplicationUser} from "../../entity/application-user.entity";
import {RequestWithUser} from "../../models/misc/request-with-user";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
        // private moduleRef: ModuleRef
    ) {
        super({
            usernameField: 'email',
            passReqToCallback: true,
        });
    }

    async validate(
        appUser: RequestWithUser,
        email: string,
        password: string
    ): Promise<ApplicationUser> {
        // const contextId = ContextIdFactory.getByRequest(appUser);
        // "AuthService" is a request-scoped provider
        // const authService = await this.moduleRef.resolve(AuthService, contextId);
        const user = await this.authService.authenticateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}