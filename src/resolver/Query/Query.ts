
export const Query= {
    users: async (parent: any, agrs: any, {prisma}: any) => {
        const user = await prisma.user.findMany();
        return user
        console.log(user)
    }
}