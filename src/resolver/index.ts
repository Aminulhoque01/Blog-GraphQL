import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

interface userInfo{
    name:string,
    email:string,
    password:string
}

export const resolvers = {
    Query: {
        users: async(parent:any, agrs:any, context:any)=>{
            const user= await prisma.user.findMany();
            return user
            console.log(user)
        }
    },
    Mutation:{
        signup:async(parent:any, agrs:userInfo,context:any)=>{
           return await prisma.user.create({
            data: agrs
           })
            
             
        }
    }
};