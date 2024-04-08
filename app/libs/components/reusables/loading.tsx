// Loading.js
import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: "50%", marginBottom: "48%" }}>
            <Spin size="large" />
        </div>
    );
};

export default Loading;
