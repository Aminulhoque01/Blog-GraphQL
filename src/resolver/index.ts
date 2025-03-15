import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { jwtHelper } from "../utils/jwtHelper";

const prisma = new PrismaClient();

interface userInfo {
    name: string,
    email: string,
    password: string
}

export const resolvers = {
    Query: {
        users: async (parent: any, agrs: any, context: any) => {
            const user = await prisma.user.findMany();
            return user
            console.log(user)
        }
    },
    Mutation: {
        signup: async (parent: any, agrs: userInfo, context: any) => {
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
            })

            const token = await jwtHelper({ userId: newUser.id })
            return {
                userError: null,
                token: token
            }

        },

        signin: async (parent: any, agrs: any, context: any) => {
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
            const token = await jwtHelper({ userId: user.id })

            console.log(token)

            return {
                token: token
            }

        }


    }
};