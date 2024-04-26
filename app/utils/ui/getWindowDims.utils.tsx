"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WindowDimensions {
    width: number | null; // Changed from undefined to null for clearer intent
    height: number | null;
}

const WindowDimensionsContext = createContext<WindowDimensions>({
    width: null, // Set default to null
    height: null,
});

export const useWindowDimensions = () => useContext(WindowDimensionsContext);

export const WindowDimensionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        width: null, // Start with null during SSR
        height: null,
    });

    useEffect(() => {
        // This effect runs only in the client
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial dimensions on client load

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowDimensionsContext.Provider value={dimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    );
};
