// components/layout/CustomFooter.tsx
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Gigyeah ©{new Date().getFullYear()} Made in India
        </Footer>
    );
};

export default CustomFooter;
