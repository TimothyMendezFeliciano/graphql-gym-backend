import {ResolverMap} from "../types/graphql-utils";
import {Trainer} from "../entity/Trainer";
import {bufferToHex} from "ethereumjs-util";
import {recoverPersonalSignature} from "eth-sig-util";
import IRegisterOnMutationArguments = GQL.IRegisterOnMutationArguments;

export const resolvers: ResolverMap = {
    Query: {
        hello: (_: any, {name}: any) => `Hello ${name || 'World'}`,
    },
    Mutation: {
        register: async (_, {publicAddress, email, firstName, lastName, isTrainer, specialty}: IRegisterOnMutationArguments) => {
            try {
                const newTrainer = Trainer.create({
                    publicAddress, email, firstName, lastName, isTrainer, specialty: specialty || ''
                })

                const confirmedNewTrainer = await newTrainer.save()

                return !!confirmedNewTrainer?.id
            } catch (error) {
                console.error('Error Creating Trainer', error)
                return false
            }
        },

        signIn: async (_, {publicAddress, signature}: GQL.ISignInOnMutationArguments) => {

            if (publicAddress || signature) {
                return false
            }

            const trainer = await Trainer.findOne({
                where: {
                    publicAddress
                }
            })

            const msg = `Signing one-time nonce: ${trainer?.nonce}`

            const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'))
            const address = recoverPersonalSignature({
                data: msgBufferHex,
                sig: signature
            })

            if(!address && !publicAddress) return false

            return publicAddress.toLowerCase() === address.toLowerCase()
        }
    }
}