import React from 'react';
import { Result, Button } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import URL from '@/app/constants/url/url';

const Unauthorized = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" href={URL.dashboard.root} icon={<RightCircleOutlined />}>Dashboard</Button>}
        />
    );
};

export default Unauthorized;
