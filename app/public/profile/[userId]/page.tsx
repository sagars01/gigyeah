import { Divider, Row, Col, Card, Tabs, Button, Result } from 'antd';
import { LinkedinOutlined, TwitterOutlined, UserOutlined, InstagramOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import UserController from '../../../libs/controllers/users/users.controller';
import CustomList from '../../../utils/ui/list.utils';
import Layout, { Content, Footer } from 'antd/es/layout/layout';
import PublicHeader from '../../../libs/components/reusables/header.public';
import Link from 'next/link';



const UserDetails = ({ userDetails }) => {
    return (
        <div className="" style={{ width: "100%" }}>
            <div className="flex items-center justify-center">
                <Title level={3} className="m-0 text-center truncate">{userDetails.name}</Title>
            </div>
            <div className="">
                <DetailItem label="Who am I?" value={userDetails.intro} />
                <DetailItem label="My Company Name" value={userDetails.company.name} />
                <DetailItem label="What we do?" value={userDetails.company.description} />
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <>
        <div className='flex'>
            <div className="font-semibold text-gray-700 text-right mr-4 w-1/2">{label}</div>
            <div className="">
                <Text className="text-gray-800 break-words w-1/2 text-ellipsis">{value}</Text>
            </div>
        </div>
    </>
);


const SocialMediaIcons = ({ socialMedia }: any) => {
    const iconMap: { [key in SocialMedia['platform']]: JSX.Element } = {
        Twitter: <TwitterOutlined style={{
            fontSize: '1.5rem'
        }} />,
        LinkedIn: <LinkedinOutlined style={{
            fontSize: '1.5rem'
        }} />,
        Instagram: <InstagramOutlined style={{
            fontSize: '1.5rem'
        }} />,
    };

    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {socialMedia?.map(({ platform, url }: SocialMedia, index: number) => (
                <a key={index} href={url} target="_blank" rel="noopener">
                    {iconMap[platform]}
                </a>
            ))}
        </div>
    );
};


const getServerSideProps = async (userId: string): Promise<{ error?: boolean, props: IUserPublicProfileData | undefined }> => {
    try {
        const res = await UserController.getUserDetailsPublic(userId);
        return { error: false, props: res };
    } catch (error: any) {
        console.error('Error fetching user details:', error);
        return { error: true, props: undefined };
    }
};

const Page = async ({ params: { userId } }: { params: { userId: string } }) => {

    try {


        const { error, props } = await getServerSideProps(userId);

        if (error) {
            return (<>
                <>
                    <Layout style={{ backgroundColor: 'Background' }}>
                        <PublicHeader />
                        <Content>
                            <div className="flex justify-center items-center h-screen">
                                <Result
                                    icon={<UserOutlined style={{ fontSize: '4rem' }} />}
                                    title="No user found"
                                    subTitle="The requested user does not exist or the information is not available."
                                    extra={
                                        <Link href={"/"}>
                                            <Button type="primary" >
                                                Go to Home
                                            </Button>
                                        </Link>
                                    }
                                />
                            </div>

                        </Content>
                        <Footer style={{ backgroundColor: 'Background' }} />
                    </Layout>
                </>
            </>);
        }

        const { userDetails = {
            name: '',
            socialMedia: [],
            company: {
                name: '',
                description: ''
            },
            intro: '',
            image_url: null
        }, jobDetails = {
            active: [],
            expired: []
        } } = props as IUserPublicProfileData;



        const MainContent = () => {
            return (
                <>
                    <Row>
                        <Col lg={{ span: 8, offset: 3 }} xs={24}>
                            <Card>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img
                                        src={userDetails.image_url ||
                                            '/dp.png'
                                        }
                                        alt="Profile Image"
                                        width={200}
                                        height={200}
                                        className="border-x-fuchsia-50"
                                        style={{ borderRadius: '20%' }}
                                    />
                                    <UserDetails userDetails={userDetails} />
                                    <Divider />
                                    <SocialMediaIcons socialMedia={userDetails?.socialMedia} />
                                </div>
                            </Card>
                        </Col>
                        <Col lg={{ span: 8, offset: 1 }} xs={24}>
                            <Card>
                                <Title level={4}>Jobs from {userDetails?.name}</Title>
                                <Tabs defaultActiveKey='1'
                                    items={[
                                        {
                                            label: 'Active',
                                            key: "1",
                                            children: <CustomList items={jobDetails?.active} />
                                        },
                                        {
                                            label: 'Expired',
                                            key: "2",
                                            children: <CustomList items={jobDetails?.expired} />
                                        }
                                    ]}
                                >
                                </Tabs>
                            </Card>
                        </Col>
                    </Row>
                </>
            );
        };

        return (
            <>
                <Layout style={{ backgroundColor: 'Background' }}>
                    <PublicHeader />
                    <Content>
                        <MainContent />
                    </Content>
                    <Footer style={{ backgroundColor: 'Background' }} />
                </Layout>
            </>
        );
    } catch (error) {
        console.log(error);
    }
};

export default Page;


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
    image_url: string;
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