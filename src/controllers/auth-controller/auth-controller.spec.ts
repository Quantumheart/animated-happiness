import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from "../../authentication/auth/auth.service";
import {JwtStrategy} from "../../authentication/auth/jwt.strategy";
import {Repository} from "typeorm";
import {UsersService} from "../../authentication/users/users.service";

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    let usersService: UsersService;
    let jwtStrategy: JwtStrategy;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, UsersService, JwtStrategy, Repository]
        }).overrideProvider(Repository).useValue({}).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    }); 

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
