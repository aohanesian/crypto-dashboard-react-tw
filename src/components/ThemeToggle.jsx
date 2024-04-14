import React, { useContext } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle(props) {
    const { theme, setTheme } = useContext(ThemeContext);

    const themeHandler = () => {
        setTheme(theme === `dark` ? `light` : `dark`)
    }

    return (
        <div className={`p-2`}>
            {theme === `dark` ? (
                <div className={`flex items-center cursor-pointer`} onClick={() => themeHandler()}><HiSun className={`text-primary text-2xl mr-2`} />Light Mode</div>
            ) : (
                <div className={`flex items-center cursor-pointer`} onClick={() => themeHandler()}><HiMoon className={`text-primary text-2xl mr-2`} />Dark Mode</div>
            )}
        </div>
    );
}

export default ThemeToggle;