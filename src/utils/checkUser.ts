// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()


// export const checkUser=async(prisma:any, userInfo:any,postId:any)=>{
//     const user = await prisma.user.findUnique({
//         where: {
//             id: userInfo.userId
//         }
//     });

//     if (!user) {
//         return {
//             userError: "User not found",
//             post: null
//         };
//     }

//     const post = await prisma.post.findUnique({
//         where: {
//             id: Number(postId)
//         }
//     });

//     if (!post) {
//         return {
//             userError: "Post not found",
//             post: null
//         };
//     }

//     // Fixing the typo: Checking if the post's author ID matches the user ID
//     if (post.authorId !== user.id) {  // Assuming the correct field name is authorId
//         return {
//             userError: "Post not owned by User!",
//             post: null
//         };
//     }
// }



export const checkUser = async (prisma: any, userInfo: any, postId: any) => {
    if (!userInfo || !userInfo.userId) {
        return {
            userError: "User ID is missing or invalid",
            post: null
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userInfo.userId // Ensure userId is passed here
        }
    });

    if (!user) {
        return {
            userError: "User not found",
            post: null
        };
    }

    const post = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        }
    });

    if (!post) {
        return {
            userError: "Post not found",
            post: null
        };
    }

    // Fixing the typo: Checking if the post's author ID matches the user ID
    if (post.authorId !== user.id) {  // Assuming the correct field name is authorId
        return {
            userError: "Post not owned by User!",
            post: null
        };
    }

    return { // Return the post if no error
        userError: null,
        post
    };
};
