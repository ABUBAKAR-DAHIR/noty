"use client"
import { AnimateIcon } from './animate-ui/icons/icon'
import { Kanban } from './animate-ui/icons/kanban'

function UserLoading({
    text
}: {text?: string}) {
  return (
    <div className='fixed inset-0 backdrop-blur-xs w-full h-full flex flex-col items-center justify-center'>
        <AnimateIcon>
            <Kanban animateOnView repeatCount={1000} className="rotate-180 size-14 text-primary" />
        </AnimateIcon>
        <p className='text-primary capitalize text-sm '>{text? text : "loading user..."}</p>
    </div>
  )
}

export default UserLoading