// components/layout/CustomHeader.tsx
import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

interface CustomHeaderProps {
    content?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ content }) => {
    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            {content}
        </Header>
    );
};

export default CustomHeader;
