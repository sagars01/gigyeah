"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WindowDimensions {
    width: number | undefined;
    height: number | undefined;
}

const WindowDimensionsContext = createContext<WindowDimensions>({
    width: undefined,
    height: undefined,
});

export const useWindowDimensions = () => useContext(WindowDimensionsContext);

export const WindowDimensionsProvider: React.FC<any> = ({ children }) => {
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener('resize', handleResize);

            handleResize();

            // Cleanup
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <WindowDimensionsContext.Provider value={dimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    );
};
