import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UsersService} from "../users/users-repository.service";
import {JwtStrategy} from "./jwt.strategy";
import {Repository} from "typeorm";

describe('AuthService', () => {
    let service: AuthService;
    const usersService = {findOne: () => ''};
    let jwtService: JwtStrategy
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, {provide: UsersService, useClass: Repository}, JwtStrategy],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtStrategy>(JwtStrategy);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
