import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Expose} from "class-transformer";
import {AggregateRoot} from "@nestjs/cqrs";
import UserAuthenticatedEvent from "../models/user/user-authenticated.event.";

@Entity()
export class ApplicationUser extends AggregateRoot {
    constructor() {
        super();
    }

    userAuthenticated(): void {
        this.apply(new UserAuthenticatedEvent(this.email))
    }
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({
        type: "varchar",
        length: 50,
        unique: true,
    })
    @Expose()
    email: string;
    @Expose()
    @Column({
        type: "varchar",
        length: 17,
        unique: true,
    })
    friend_code: string;
    @Column({type: 'varchar'})
    password: string;
    @Column({type: 'varchar', length: 25})
    @Expose()
    firstname: string;
    @Column({type: 'varchar', length: 25})
    @Expose()
    lastname: string;
    @Column({type: 'date'})
    dob: Date;
    @CreateDateColumn()
    created: Date;
}