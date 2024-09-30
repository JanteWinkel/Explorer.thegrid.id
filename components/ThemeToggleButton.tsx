'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Reutilizar el componente Button

export default function ThemeToggleButton() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Button
            variant="outline"
            className="w-full md:w-fit"
            onClick={toggleTheme}
        >
            {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </Button>
    );
}