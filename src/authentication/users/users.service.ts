import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {ApplicationUser} from "../../entity/application-user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import CreateUserDto from "../../models/user/create-user-dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(ApplicationUser)
                private usersRepository: Repository<ApplicationUser>,) {
    }

    async addApplicationUser(appUser: CreateUserDto): Promise<ApplicationUser> {
        try {
            const applicationUser: ApplicationUser = await this.usersRepository.create(appUser);
            await this.usersRepository.save(applicationUser);
            return applicationUser;
        } catch (e) {
            console.log(e);
        }

    }

    findAll(): Promise<ApplicationUser[]> {
        return this.usersRepository.find();
    }

    async findById(id: string): Promise<ApplicationUser> {
        return await this.usersRepository.findOne(id);
    }

    async findByEmail(email: string): Promise<ApplicationUser> {
        return await this.usersRepository.findOne({where: {email: email}});
    }

    async removeById(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}