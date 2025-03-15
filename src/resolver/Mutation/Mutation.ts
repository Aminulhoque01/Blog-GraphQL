
import bcrypt from "bcrypt"
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";




interface userInfo {
    name: string,
    email: string,
    password: string
    bio?:string
}


export const  Mutation= {
    signup: async (parent: any, agrs: userInfo, {prisma}: any) => {
        const isExist = await prisma.user.findFirst({
            where: {
                email: agrs.email
            }
        });

        if (isExist) {
            return {
                userError: "Already this email is registered!",
                token: null
            }
        }

        const hashedPassword = await bcrypt.hash(agrs.password, 12)
        const newUser = await prisma.user.create({
            data: {
                name: agrs.name,
                email: agrs.email,
                password: hashedPassword

            }
        });

        if(agrs.bio){
            await prisma.profile.create({
                data:{
                    bio:agrs.bio,
                    userId:newUser.id
                }
            })
        }

        const token = await jwtHelper({ userId: newUser.id }, config.jwt.secret as string)
        return {
            userError: null,
            token: token
        }

    },

    signin: async (parent: any, agrs: any, {prisma}: any) => {
        const user = await prisma.user.findFirst({
            where: {
                email: agrs.email
            }
        });

        if (!user) {
            return {
                userError: "User not fund..!!🚫",
                token: null
            }
        }

        const correctPass = await bcrypt.compare(agrs.password, user?.password)

        if (!correctPass) {
            return {
                userError: "Incorrect your password..!!🚫",
                token: null
            }
        }
        const token = await jwtHelper({ userId: user.id }, config.jwt.secret as string)

        console.log(token)

        return {
            token: token
        }

    }


}