import { authResolvers } from "./auth";
import { postResolver } from "./post";




export const  Mutation= {
    ...authResolvers,
    

    ...postResolver
    
 
}