

import URL from "@/app/constants/url/url";
import { UserContext, useUser } from "@/app/user/profile/contexts/UserProfileContext";
import { LinkOutlined } from "@ant-design/icons";
import { Typography, Card, Avatar, Button } from "antd";
import Link from "next/link";
import { useContext, useEffect } from "react";


const { Title, Text } = Typography;

const ProfileVisualizer: React.FC = () => {
    const { userData, loading } = useContext(UserContext);

    useEffect(() => {

    }, [userData])

    return (
        <Card loading={loading} extra={
            <>
                <Link href={`${URL.user.public}/${userData.id}`} target="_blank">
                    <Button type="primary" icon={<LinkOutlined />}>View Public Profile</Button>
                </Link>
            </>
        }>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={userData.image_url} size={128}></Avatar>
                <Title level={3}>{userData.name}</Title>
                <Text>{userData.title}</Text>
                <Text>{userData.email}</Text>
                <Text>{userData.intro}</Text>
                <Title level={4}>Company</Title>
                <Text>{userData.company.name}</Text>
                <Text>{userData.company.description}</Text>
            </div>
        </Card>
    );
};

export default ProfileVisualizer;
