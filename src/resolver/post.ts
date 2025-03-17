import { userLoader } from "../dataLoaders/userLoader"

export const Post ={
    author:async(parent:any, args:any,{prisma,userInfo}:any)=>{
        return await userLoader.load(parent.authorId)
       
    }
}