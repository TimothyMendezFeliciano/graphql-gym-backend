import {bufferToHex} from "ethereumjs-util";
import {recoverPersonalSignature} from "eth-sig-util";
import {ResolverMap} from "../../types/graphql-utils";
import {Trainer} from "../../entity/Trainer";
import * as yup from 'yup'
import {formatYupError} from "../../utils/formatYupError";

const schema = yup.object().shape({
    email: yup.string().min(3, "Must be at least 3 characters long").max(255).email()
})

export const resolvers: ResolverMap = {
    Query: {
        bye: () => "bye"
    },
    Mutation: {
        register: async (_,
                         args: GQL.IRegisterOnMutationArguments) => {
            try {
                await schema.validate(args, {abortEarly: false}) // Allows to show all the errors. not just the first.
            } catch (error) {
                console.log(error)
                return formatYupError(error)
            }
            const {
                publicAddress,
                email,
                firstName,
                lastName,
                isTrainer,
                specialty
            } = args
            const trainerAlreadyExists = await Trainer.findOne({
                where: {email, publicAddress},
                select: ['id']
            })

            if (trainerAlreadyExists) {
                return [
                    {
                        path: 'publicAddress',
                        message: 'Public Address already in use'
                    },
                    {
                        path: 'email',
                        message: 'Email Already in use'
                    }
                ]
            }

            const newTrainer = Trainer.create({
                publicAddress, email, firstName, lastName, isTrainer, specialty: specialty || ''
            })
            await newTrainer.save()

            return null
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

            if (!address && !publicAddress) return false

            return publicAddress.toLowerCase() === address.toLowerCase()
        }
    }
}