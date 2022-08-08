import {Entity, Column, PrimaryColumn, BeforeInsert} from "typeorm"
import {v4 as uuidv4} from 'uuid';

@Entity()
export class Trainer {

    @PrimaryColumn("uuid") id: string

    @Column("varchar", {length: 40}) address: string

    @Column("varchar", {length: 255}) email: string

    @Column("varchar", {length: 255}) firstName: string

    @Column("varchar", {length: 255}) lastName: string

    @Column("text", {nullable: true}) specialty: string

    @Column("boolean") isTrainer: boolean

    @BeforeInsert()
    addId() {
        this.id = uuidv4()
    }

}
