// WindowDimensionsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface WindowDimensions {
    width: number;
    height: number;
}

const WindowDimensionsContext = createContext<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
});

export const useWindowDimensions = () => useContext(WindowDimensionsContext);

export const WindowDimensionsProvider: React.FC<any> = ({ children }) => {
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowDimensionsContext.Provider value={dimensions} >
            {children}
        </WindowDimensionsContext.Provider>
    );
};
