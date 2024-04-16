import URL from "@/app/utils/constants/url/url";
import { UserContext, useUser } from "@/app/user/profile/contexts/UserProfileContext";
import { InstagramOutlined, LinkOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Typography, Card, Avatar, Button, Space, Col, Row } from "antd";
import Link from "next/link";
import { useContext, useEffect } from "react";

const { Title, Text } = Typography;

const SocialMediaVisualizer: React.FC<{ socialMedia: any[] }> = ({ socialMedia }) => {
    // Mapping of social media platform names to their respective icons
    const platformIcons: { [key: string]: React.ReactNode } = {
        Twitter: <TwitterOutlined style={{ fontSize: '1.5rem' }} />,
        LinkedIn: <LinkedinOutlined style={{ fontSize: '1.5rem' }} />,
        Instagram: <InstagramOutlined style={{ fontSize: '1.5rem' }} />
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <Row>
                {socialMedia.map((item, index) => (
                    <Col lg={3} key={index} style={{ margin: '1rem' }}>
                        {
                            item && item.url && platformIcons[item.platform] && (
                                <Link href={item.url} target="_blank">
                                    {platformIcons[item.platform]}
                                </Link>
                            )
                        }
                    </Col>
                ))}
            </Row>
        </div>
    );
};


const ProfileVisualizer: React.FC = () => {
    const { userData, loading } = useContext(UserContext);

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <Card
            loading={loading}
            extra={
                <>
                    <Link href={`${URL.user.public}/${userData.id}`} target="_blank">
                        <Button disabled={loading} type="primary" icon={<LinkOutlined />}>View Public Profile</Button>
                    </Link>
                </>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={userData.image_url} size={128}></Avatar>
                <Title level={3}>{userData.name}</Title>
                <Title level={4}>{userData.title}</Title>
                <Text>{userData.intro}</Text>
                <Title level={4}>Company</Title>
                <Text>{userData.company.name}</Text>
                <Text>{userData.company.description}</Text>
                <SocialMediaVisualizer socialMedia={userData.socialMedia} />
            </div>
        </Card>
    );
};

export default ProfileVisualizer;
