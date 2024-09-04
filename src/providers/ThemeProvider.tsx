import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


type ThemeContextType = {
    theme: string,
    toggleTheme: (next: string) => void,
};

const ThemeContext = createContext<ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const getTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme) {
                    setTheme(savedTheme);
                }
            } catch (error) {
                console.log('Error loading theme:', error);
            }
        };
        getTheme();
    }, []);

    const toggleTheme = (next) => {
        setTheme(next);
        AsyncStorage.setItem('theme', next)
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
