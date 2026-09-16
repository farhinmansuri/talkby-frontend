import React, { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeContext';
const ThemeChanger = () => {
    const { darkMode, toggleTheme } = useTheme();
    return (
     


        <button onClick={toggleTheme} className='text-xs px-2 text-gen-text'>
            {darkMode ? "☀️ Day" : "🌙 Night"}
        </button>
    )
}

export default ThemeChanger
