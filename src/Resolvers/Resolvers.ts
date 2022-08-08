import {ResolverMap} from "../types/graphql-utils";

export const resolvers: ResolverMap = {
    Query: {
        hello: (_: any, {name}: any) => `Hello ${name || 'World'}`,
    },
    Mutation: {
        register: (_, {address}: GQL.IRegisterOnMutationArguments) => {
            return false
        }
    }
}