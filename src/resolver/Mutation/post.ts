import { checkUser } from "../../utils/checkUser";


export const postResolver = {
    addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
        if (!userInfo) {
            return {
                userError: "Unauthorized",
                post: null
            };
        }

        if (!post.title || !post.content) {
            return {
                userError: "Title and content are required",
                post: null
            };
        }

        try {
            const newPost = await prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content,
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
    },





    updatePost: async (parent: any, agrs: any, { prisma, userInfo }: any) => {
        try {
            if (!userInfo) {
                return {
                    userError: "Unauthorized",
                    post: null
                };
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userInfo.userId
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
                    id: Number(agrs.postId)
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

            // utils import part
            // const error= await checkUser(prisma,userInfo.userId, agrs.postId)
            // if(error){
            //     return{
            //         error
            //     }
            // }

            const updatePost = await prisma.post.update({
                where: {
                    id: Number(agrs.postId)
                },
                data: agrs.post  // Ensure agrs.post is properly structured with required fields like title and content
            });

            return {
                userError: null,
                post: updatePost
            };

        } catch (error) {
            console.error("Error updating post:", error);
            return {
                userError: "Internal server error",
                post: null
            };
        }
    },



    deletePost: async (parent: any, agrs: any, { prisma, userInfo }: any) => {
        try {
            if (!userInfo) {
                return {
                    userError: "Unauthorized",
                    post: null
                };
            }



            const user = await prisma.user.findUnique({
                where: {
                    id: userInfo.userId
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
                    id: Number(agrs.postId)
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

            const deletePost = await prisma.post.delete({
                where: {
                    id: Number(agrs.postId)
                },
                // Ensure agrs.post is properly structured with required fields like title and content
            });
            console.log(deletePost)
            return {
                userError: null,
                post: deletePost
            };

        } catch (error) {
            console.error("Error updating post:", error);
            return {
                userError: "Internal server error",
                post: null
            };
        }
    },

    publishedPost: async (parent: any, agrs: any, { prisma, userInfo }: any) => {
        try {
            if (!userInfo) {
                return {
                    userError: "Unauthorized",
                    post: null
                };
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userInfo.userId
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
                    id: Number(agrs.postId)
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

           

            const updatePost = await prisma.post.update({
                where: {
                    id: Number(agrs.postId)
                },
                data: {
                    published: true,
                }  // Ensure agrs.post is properly structured with required fields like title and content
            });

            return {
                userError: null,
                post: updatePost
            };

        } catch (error) {
            console.error("Error updating post:", error);
            return {
                userError: "Internal server error",
                post: null
            };
        }
    }



}