import {Entity, Column, BeforeInsert, BaseEntity, PrimaryGeneratedColumn,} from "typeorm"

@Entity("Trainer")
export class Trainer extends BaseEntity {

    @PrimaryGeneratedColumn("uuid") id: string

    @Column("varchar", {length: 60, unique: true}) publicAddress: string

    @Column("varchar", {length: 255, unique: true}) email: string

    @Column("varchar", {length: 255}) firstName: string

    @Column("varchar", {length: 255}) lastName: string

    @Column("text", {nullable: true}) specialty: string

    @Column("boolean") isTrainer: boolean

    @Column("numeric") nonce: number

    @BeforeInsert()
    addNonce() {
        this.nonce = Math.floor(Math.random() * 1000000)
    }

}
