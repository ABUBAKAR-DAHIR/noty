"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

function Themer() {
    const {theme, setTheme} = useTheme()
    return (
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className='cursor-pointer py-4.5 px-3 text-white'>
            {
                theme === "light" ? <Moon /> : <Sun />
            }
        </Button>
    )
}

export default Themer