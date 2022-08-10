// @ts-ignore
import request from "graphql-request";
import {host} from "./constants";

describe("Start server and register first trainer", () => {

    const registerAddress = '0xb199f3'
    const registerEmail = 'test@email.com'
    const registerFirstName = 'Timothy'
    const registerLastName = 'Mendez'
    const registerIsTrainer = false
    const registerSpecialty = 'none'

    const mutation = `
    mutation {
    register(publicAddress: "${registerAddress}", email: "${registerEmail}", firstName: "${registerFirstName}", lastName: "${registerLastName}", isTrainer: ${registerIsTrainer}, specialty: "${registerSpecialty}")
    }
    `
    test("Create the first trainer", async () => {
        const response = await request(host, mutation)
        expect(response).toEqual({register: true})
    })
})