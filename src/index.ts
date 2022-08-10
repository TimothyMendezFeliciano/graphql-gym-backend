import {createServer} from "@graphql-yoga/node";
import {schema} from "./schema";
import {AppDataSource} from "./data-source";

export async function main() {
    AppDataSource.initialize().then(async()=>{
        const server = createServer({schema})
        await server.start()
        console.log('Server is running on localhost:4000')
    })
}

main()