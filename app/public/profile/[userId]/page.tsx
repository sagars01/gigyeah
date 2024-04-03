import Image from 'next/image';
import { Space, List, Divider, Row, Col, Card, Tabs, Button, Menu, MenuProps } from 'antd';
import { LinkedinOutlined, TwitterOutlined, GithubOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import UserController from '@/app/controllers/users/users.controller';
import CustomList from '@/app/utils/ui/list.utils';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import { HomeOutlined, DollarOutlined, PhoneOutlined, LoginOutlined } from '@ant-design/icons';
import { redirect } from 'next/navigation'
import PublicHeader from '@/app/libs/components/reusables/header.public';



async function getServerSideProps(userId: string): Promise<IUserPublicProfileData> {

    try {
        const res = await UserController.getUserDetailsPublic(userId);

        return res;
    } catch (error: any) {
        throw new Error(error)
    }
}


export default async function Page({ params: { userId } }: { params: { userId: string } }) {


    // TODO: Fix the icons
    // TODO: Fix the Next-SEO

    const largeIconStyle = {
        fontSize: '24px'
    };
    const userInfo: IUserPublicProfileData = await getServerSideProps(userId);
    console.log(userInfo)
    const { userDetails, jobDetails } = userInfo;
    userDetails.socialMedia = [
        {
            url: '',
            platform: 'linkedin'
        },
        {
            url: '',
            platform: 'linkedin'
        },
        {
            url: '',
            platform: 'linkedin'
        }
    ]


    const MainContent = () => {
        return (
            <>
                <Row>
                    <Col lg={{ span: 8, offset: 3 }} xs={24}>
                        <Card>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Image
                                    src="/dp.jpg"
                                    alt="Profile Image"
                                    width={200}
                                    height={200}
                                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                                />
                                <Title level={3} style={{ marginTop: '1rem' }}>
                                    {userDetails.name}
                                </Title>
                                <Text>
                                    {userDetails.intro}
                                </Text>
                                <div className='company-details'>
                                    {
                                        userDetails.company.name
                                    }
                                </div>
                                <Divider />
                                <Space>
                                    <LinkedinOutlined style={largeIconStyle} />
                                    <TwitterOutlined style={largeIconStyle} />
                                    <GithubOutlined style={largeIconStyle} />
                                </Space>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={{ span: 8, offset: 1 }} xs={24}>
                        <Card>

                            <Title level={4}>Jobs from {userDetails.name}</Title>
                            <Tabs defaultActiveKey='1'
                                items={[
                                    {
                                        label: 'Active',
                                        key: "1",
                                        children: <CustomList items={jobDetails.active} />
                                    },
                                    {
                                        label: 'Expired',
                                        key: "2",
                                        children: <CustomList items={jobDetails.expired} />
                                    }
                                ]}
                            >
                            </Tabs>
                        </Card>
                    </Col>
                </Row >
            </>
        )
    }

    return (
        <>
            <Layout style={{ backgroundColor: 'Background' }}>
                <PublicHeader />
                <Content >
                    <MainContent />
                </Content>
                <Footer style={{ backgroundColor: 'Background' }} />
            </Layout>
        </>
    );
}


interface SocialMedia {
    platform: string;
    url: string;
}

export interface UserDetails {
    _id: string;
    name: string;
    title: string;
    email: string;
    intro: string;
    company: {
        name: string;
        description: string;
    };
    jobsCreated: number;
    subscriptionLevel: number;
    createdAt: string;
    socialMedia: SocialMedia[];
    __v: number;
}

interface Job {
    _id: string;
    createdBy: {
        name: string;
        id: string;
        profileImg: string;
        company: {
            name: string;
            description: string;
        };
        _id: string;
    };
    title: string;
    description: string;
    requirements: string[];
    location: {
        city: string;
        country: string;
    };
    remote: boolean;
    payRange: {
        currency: string;
        min: number;
        max: number;
    };
    status: string;
    postedAt: string;
    __v: number;
}

export interface JobDetails {
    active: Job[];
    expired: Job[];
}

export interface IUserPublicProfileData {
    userDetails: UserDetails;
    jobDetails: JobDetails;
}

