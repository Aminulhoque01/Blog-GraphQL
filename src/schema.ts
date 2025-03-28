export const typeDefs = `#graphql
    type Query{
        me:User
        users:[User]
        posts:[Post]
        profile(userId:ID!):Profile
    }  

   type Mutation{
        signup(
            name:String!
            email:String!
            password:String!
            bio:String
        ):UserArgs
        
        signin(
            email:String!
            password:String!

        ):AuthPayload


        addPost(post:PostInput):PostPayload,
        updatePost(postId:ID!, post:PostInput):PostPayload,
        deletePost(postId:ID!):PostPayload
        publishedPost(postId:ID!):PostPayload
    } 

    type Post {
        id:ID !
        title:String!
        content:String!
        author: User
        createdAt:String!
        published: Boolean!
    }

    type User {
        id:ID!
        name:String!
        email:String!
        posts:[Post]
    }

    type Profile{
        id:ID!
        bio:String!
        createdAt:String!
        user:User!

    }

    type PostPayload{
      userError:String
      post:Post
    }

    type UserArgs {
        userError:String
        token:String
    }

    type AuthPayload{
        userError:String
        token:String
    }

    input PostInput{
        title:String
        content:String
    }
`;
