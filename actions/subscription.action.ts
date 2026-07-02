"use server"
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUserAction } from "./user.actions";

export async function createSubscriptionAction({
    endpoint,
    p256dh,
    auth
}: {endpoint: string, p256dh: string, auth: string}){
    try {
        const {getUser} = getKindeServerSession()

        const kindeUser = await getUser()
        

        let user = kindeUser ? await prisma.user.findUnique({
            where: {kindeId: kindeUser?.id}
        }) : null;


        if(!user && kindeUser) {
            user = await prisma.user.create({
                data: {
                    kindeId: kindeUser.id,
                    email: kindeUser.email,
                    name: kindeUser.given_name
                }
            })
        }

        const subscription = await prisma.subscription.upsert({
            where: {
                endpoint
            },

            update: {
                p256dh,
                auth
            },

            create: {
                endpoint,
                p256dh,
                auth,
                userId: user?.id ?? null
            }
        })


        return {
            success: true,
            user: user,
            subscription
        }

    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message);
        return {
            success: false,
            error: error.message
        }
    }
}