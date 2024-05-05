import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const NonStrictDndProvider = ({ children }) => {
    return (
        <React.StrictMode>
            <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </React.StrictMode>
    );
};

export default NonStrictDndProvider;
