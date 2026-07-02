"use client"
import { Button } from '@/components/ui/button'
import UserLoading from '@/components/UserLoading'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { useEffect, useState } from 'react'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation'


function Login() {
    const [open, setOpen] = useState<boolean>(false)
    const {user, getUser} = useKindeBrowserClient();
    const router = useRouter()

    useEffect(()=>{
        console.log("before")
        if(!user) return
        console.log("after")
        console.log(user)
        router.push("/")
    }, [user])

    if(user) router.push("/")

    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
            <h2 className='mb-4 mt-40 text-[15px]'>Please login to continue</h2>
            <Button asChild className='py-5 w-80 max-sm:w-8/10 text-white cursor-pointer capitalize text-[15px]' onClick={() => setOpen(true)}>
                {
                    open ? <UserLoading text='routing to login page...'/> : <LoginLink postLoginRedirectURL='/'>sign in</LoginLink>
                }
            </Button>
            <Button asChild className='py-5 w-80 max-sm:w-8/10 text-white cursor-pointer capitalize text-[15px]' onClick={() => setOpen(true)}>
                {
                    open ? <UserLoading text='routing to signup page...'/> : <RegisterLink postLoginRedirectURL='/'>Register</RegisterLink>
                }
            </Button>
        </div>
    )
}

export default Login