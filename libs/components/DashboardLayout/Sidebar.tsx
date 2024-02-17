// components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
    siderItems: Array<any>;
    bottomSiderItems: Array<any>;
}

const Sidebar: React.FC<SidebarProps> = ({ siderItems, bottomSiderItems }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Menu theme="dark" mode="inline" items={siderItems} />
            <Menu theme="dark" mode="inline" items={bottomSiderItems} style={{ marginTop: 'auto' }} />
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ margin: '10px auto', display: 'block' }}
            />
        </Sider>
    );
};

export default Sidebar;
