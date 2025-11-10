import { MoonStar, SunMedium } from 'lucide-react'
import {useEffect, useState} from 'react'

function SwitchTheme() {

    const [theme, setTheme]= useState('light');

    useEffect(()=>{
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme);
        }
    },[])
    const toggleTheme = ()=>{
        const newTheme = theme === 'light'? 'dark': 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme',newTheme);
    }
    
  return (
    <div onClick={toggleTheme}>
        {
            theme === 'light'? <SunMedium />: <MoonStar/>
        }
    </div>
  )
}

export default SwitchTheme