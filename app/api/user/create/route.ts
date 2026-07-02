import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(){
    try {
        const {getUser, isAuthenticated} = getKindeServerSession()

        if(!isAuthenticated) return NextResponse.json({
            success: false,
            error: "User not authenticated"
        }, {status: 400}) 

        const kindeUser = await getUser()
        
        if(!kindeUser) return NextResponse.json({
            success: false,
            error: "User not found"
        }, {status: 400}) 

        const user = await prisma.user.findUnique({
            where: {kindeId: kindeUser.id}
        })

        if(user) return NextResponse.json({
            success: false,
            error: "User already created"
        }, {status: 400}) 

        const newUser = await prisma.user.create({
            data: {
                kindeId: kindeUser.id,
                email: kindeUser.email,
                name: kindeUser.given_name
            }
        })

        return NextResponse.json({
            success: true,
            newUser
        }, {status: 201})

    } catch (error: any) {
        console.log("SERVER ERROR: ", error.message);
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500})
    }
}