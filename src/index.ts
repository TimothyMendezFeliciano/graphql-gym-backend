import {createServer} from "@graphql-yoga/node";
import {schema} from "./schema";
import {AppDataSource} from "./data-source";

async function main() {
    AppDataSource.initialize().then(async()=>{
        const server = createServer({schema})
        await server.start()
    })

}

main()