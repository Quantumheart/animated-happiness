import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: 'varchar',
        length: 50
    })
    name: string;
    @Column({
        type: 'varchar',
        length: 10
    })
    type: string;
}
