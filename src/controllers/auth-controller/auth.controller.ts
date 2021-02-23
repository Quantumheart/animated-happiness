import {
    Controller,
    Post,
    UseGuards,
    Get,
    Body,
    HttpCode,
    Res,
    Req, SerializeOptions
} from '@nestjs/common';
import {LocalAuthGuard} from "../../authentication/auth/local-auth-guard.service";
import {AuthService} from "../../authentication/auth/auth.service";
import {JwtAuthGuard} from "../../authentication/auth/jwt-auth-guard.service";
import {RequestWithUser} from "../../models/misc/request-with-user";
import CreateUserDto from "../../models/user/create-user-dto";
import {ApplicationUser} from "../../entity/application-user.entity";

@Controller('auth')
@SerializeOptions({
    strategy: 'excludeAll'
})
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    authenticate(@Req() request: RequestWithUser): ApplicationUser {
        const user = request.user;
        user.password = undefined;
        return user;
    }
    
    @Post('register')
    async register(@Body() req: CreateUserDto) : Promise<ApplicationUser> {
        return this.authService.register(req);
    }
    
    @HttpCode(200)
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() request: RequestWithUser): Promise<ApplicationUser> {
        const {user} = request;
        const cookie: string = this.authService.getCookieWithJwtToken(user.id);
        request.res.header('Set-Cookie', cookie);
        user.password = undefined;
        return user;
    }

    @HttpCode(200)
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logOut(@Req() request: RequestWithUser, @Res() response: any): Promise<any> {
        const cookie: string = this.authService.getCookieForLogOut();
        response.header('Set-Cookie', cookie);
        return response.sendStatus(200);
    }
}
