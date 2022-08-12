import "reflect-metadata"
import {DataSource} from "typeorm"
import 'dotenv/config'
import {Trainer} from "./entity/Trainer";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Timothy1",
    database: "graphql-gym",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [Trainer],
    migrations: [],
    subscribers: [],
})
