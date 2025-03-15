
import bcrypt from "bcrypt"
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";




interface userInfo {
    name: string,
    email: string,
    password: string
    bio?:string
    userId:number
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

        const token = await jwtHelper.generateToken({ userId: newUser.id }, config.jwt.secret as string)
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
        const token = await jwtHelper.generateToken({ userId: user.id }, config.jwt.secret as string)

        console.log(token)

        return {
            token: token
        }

    },


    

    addPost: async (parent: any, agrs: any, { prisma, userInfo }: any) => {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                post: null
            };
        }
    
        if (!agrs.title || !agrs.content) {
            return {
                userError: "Title and content are required",
                post: null
            };
        }
    
        try {
            const newPost = await prisma.post.create({
                data: {
                    title: agrs.title,
                    content: agrs.content,
                    author: {
                        connect: {
                            id: userInfo.userId  // Connect the post with an existing User by ID
                        }
                    }
                }
            });
    
            
            return {
                userError: null,
                post: newPost
            };
        } catch (error) {
            console.error("Error creating post:", error);
            return {
                userError: "Failed to create post",
                post: null
            };
        }
    }
    
    




}