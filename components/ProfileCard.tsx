"use client"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React, { useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { useWebHaptics } from 'web-haptics/react'

function ProfileCard() {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
  const {getUser, isLoading} = useKindeBrowserClient()
  const user = getUser()
  const {trigger} = useWebHaptics()

  // console.log("user: ", user)
  // const isLoading = true

  if(isLoading) return (
    <div className='flex gap-1 items-center justify-center border p-1 rounded-md border-transparent hover:border-black dark:hover:border-white cursor-pointer flex-wrap'>
        <Skeleton className='size-8 rounded-full'/>
        <div className='flex flex-col gap-y-2'>
            <Skeleton className='w-10 h-3'/>
            <Skeleton className="w-full h-3" />
        </div>
    </div>  
  )

  if(!user && !isLoading) return
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex gap-1 items-center justify-center border p-1 rounded-md border-transparent hover:border-black dark:hover:border-white cursor-pointer flex-wrap'>
            <div className="relative size-8 rounded-full overflow-clip">
                { user?.picture?
                  <Image src={user?.picture || ""} alt='profile' fill  sizes='7'/>
                  :
                  // <div className='size-full rounded-full flex items-center justify-center uppercase border border-black '>
                    <p>{user?.given_name? user.given_name[0] : "U"}</p>
                  // </div>
                }
            </div>
            <div>
                <p className='capitalize text-[13px] truncate'>{user?.given_name ?? "user"}</p>
                <p className="text-gray-600 dark:text-gray-400 text-[11px]">Admin</p>
            </div>
        </div>
      </PopoverTrigger>

      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className='flex flex-col gap-y-4'>
          <p className='capitalize text-center font-semibold border-b border-card'>{user?.given_name}</p>

          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button variant="destructive" className='py-5 cursor-pointer' onClick={() => {setIsLoggingOut(true); trigger("success")}} disabled={isLoggingOut} asChild>
                <LogoutLink postLogoutRedirectURL= {window.location.origin} className='w-full'>
                  {isLoggingOut ? <Spinner /> : 'Logout'}
                </LogoutLink>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Logout from the platform </p>
            </TooltipContent>
          </Tooltip>
            
        </div>
      </PopoverContent>
      
    </Popover>
  )
}

export default ProfileCard