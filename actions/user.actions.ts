import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createUserAction(){
    try {
        const {getUser, isAuthenticated} = getKindeServerSession()
        const isloggedIn = await isAuthenticated()
        if(!isloggedIn) return {
            success: false,
            error: "User not authenticated"
        }

        const kindeUser = await getUser()
        
        if(!kindeUser) return {
            success: false,
            error: "User not found"
        }

        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })

        if(user) return {
            success: false,
            error: "User already created"

            }
        const newUser = await prisma.user.create({
            data: {
                kindeId: kindeUser.id,
                email: kindeUser.email,
                name: kindeUser.given_name
            }
        })

        return {
            success: true,
            newUser
        }

    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message);
        return {
            success: false,
            error: error.message
        }

    }
}