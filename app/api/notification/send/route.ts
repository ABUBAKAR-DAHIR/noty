import { createUserAction } from "@/actions/user.actions";
import { prisma } from "@/lib/prisma";
import webpush from "@/lib/webpush"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {title, body, url, endpoint} = await request.json()
        if(!title || !body || !url || !endpoint) return NextResponse.json({
            success: false,
            error: "Missing items"
        }, {status: 400})

        const payload = JSON.stringify({
            title,
            body,
            url
        })

        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()


        if(!kindeUser){
            const target = await prisma.subscription.findUnique({
                where: {endpoint: endpoint}
            })

            if(!target) return NextResponse.json({
                success: false,
                error: "Target not found. subscription not registered!"
            }, {status: 404})

            const subscription = {
                endpoint: target.endpoint,
                keys: {
                    p256dh: target.p256dh,
                    auth: target.auth
                }
            }

            const sendNotification = await webpush.sendNotification(subscription as any, payload)

            return NextResponse.json({
                success: true,
                sendNotification                
            }, {status: 200})
        }

        let user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })

        if(!user){
            const res = await createUserAction()
            if(!res.success || !res.newUser){
                return NextResponse.json({
                    success: false,
                    error: "Could not create user. please try again"
                }, {status: 405})                
            }

            user = res.newUser
        }

        const sub = await prisma.subscription.findUnique({
            where: {userId: user?.id, endpoint: endpoint}
        })

        if(!sub){
            return NextResponse.json({
                success: false,
                error: "No subscription found"
            }, {status: 400})
        }

        try {
            const subscription = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth
                }
            }
            
            await webpush.sendNotification(subscription as any, payload)
            
        } catch (error: any) {
            console.log("Server error: failed to send a notification: ", sub.endpoint)
        }

        return NextResponse.json({
            success: true,
            message: "notifications sent!"
        }, {status: 200})


    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message);
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500})
    }
}