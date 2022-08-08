import {BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn("uuid") id: string

    @Column("varchar", {length: 40}) address: string

    @Column("varchar", {length: 255}) email: string

    @BeforeInsert()
    addId() {
        this.id = uuidv4()
    }
}