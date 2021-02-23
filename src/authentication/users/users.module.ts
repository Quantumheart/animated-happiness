import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApplicationUser} from "../../entity/application-user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ApplicationUser])],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {
}
