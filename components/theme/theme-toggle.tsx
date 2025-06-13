'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { useThemeStore } from "@/store/theme-store"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export default function ThemeToggle () {
    const {isDarkMode, toggleTheme} = useThemeStore()
    const {theme, setTheme} = useTheme()

    useEffect(()=>{
        if (theme === 'dark' && !isDarkMode){
            useThemeStore.setState({isDarkMode : true})
        } else if (theme === 'light' && isDarkMode){
            useThemeStore.setState({isDarkMode : false})
        }
    },[theme, isDarkMode])

    const handleToggleTheme = () =>{
        toggleTheme()
        setTheme(isDarkMode ? 'light' : 'dark')
    }

    return (
        <Button
            variant="ghost"
            onClick={handleToggleTheme}
            size="icon"
            className="relative"
        >
            {/* Sun Icon */}
            <Sun
                className="
                    h-5 w-5 absolute transition-all duration-700 ease-in-out
                    transform scale-100 rotate-0 opacity-100
                    dark:scale-0 dark:rotate-180 dark:opacity-0
                "
            />
            {/* Moon Icon */}
            <Moon
                className="
                    h-5 w-5 transition-all duration-700 ease-in-out
                    transform scale-0 rotate-180 opacity-0
                    dark:scale-100 dark:rotate-0 dark:opacity-100
                "
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}