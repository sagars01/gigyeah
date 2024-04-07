

import { UserContext, useUser } from "@/app/libs/contexts/UserProfileContext";
import { Typography, Card, Avatar } from "antd";
import { useContext, useEffect } from "react";


const { Title, Text } = Typography;

const ProfileVisualizer: React.FC = () => {
    const { userData, loading } = useContext(UserContext);

    useEffect(() => {

    }, [userData])

    return (
        <Card loading={loading}>
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
