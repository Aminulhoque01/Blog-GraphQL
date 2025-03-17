
export const Query= {
    me: async(parent:any, agrs:any, {prisma, userInfo}:any)=>{
        return await prisma.user.findUnique({
            where:{
                id:userInfo.userId
            }
        })
    },

    profile:async(parent:any, agrs:any, {prisma, userInfo}:any)=>{
        return await prisma.profile.findUnique({
            where:{
                userId: parseInt(agrs.userId)
            }
        })
    },

    users: async (parent: any, agrs: any, {prisma}: any) => {
        const user = await prisma.user.findMany();
        return user
        console.log(user)
    },

    posts: async(parent:any,agrs:any,{prisma}:any)=>{
        return await prisma.post.findMany({
            // where:{
            //     published:true
            // },
            orderBy:[
                {
                    createdAt:'desc'
                }
            ]
        })
    }
}