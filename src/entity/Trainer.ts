import {Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity,} from "typeorm"
import {v4 as uuidv4} from 'uuid';

@Entity("Trainer")
export class Trainer extends BaseEntity {

    @PrimaryColumn("uuid") id: string

    @Column("varchar", {length: 60, unique: true}) publicAddress: string

    @Column("varchar", {length: 255}) email: string

    @Column("varchar", {length: 255}) firstName: string

    @Column("varchar", {length: 255}) lastName: string

    @Column("text", {nullable: true}) specialty: string

    @Column("boolean") isTrainer: boolean

    @Column("numeric") nonce: number

    @BeforeInsert()
    addId() {
        this.id = uuidv4()
    }

    @BeforeInsert()
    addNonce() {
        this.nonce = Math.floor(Math.random() * 1000000)
    }

}
