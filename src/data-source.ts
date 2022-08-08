import "reflect-metadata"
import { DataSource } from "typeorm"
import { Trainer } from "./entity/Trainer"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Timothy1",
    database: "graphql-gym",
    synchronize: true,
    logging: false,
    entities: [Trainer],
    migrations: [],
    subscribers: [],
})
