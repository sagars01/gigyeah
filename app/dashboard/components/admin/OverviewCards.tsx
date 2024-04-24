import { Card } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

export interface OverviewCardProps {
    key: string
    title: string | React.ReactNode;
    description: string;
    actionButtonLink?: string;
    status?: 'enabled' | 'disabled' | undefined;
}

export const OverviewCards: React.FC<OverviewCardProps> = ({ title, description, actionButtonLink, status = 'enabled' }) => {
    return (

        <Card className={`${status === 'disabled' ? 'opacity-60' : 'opacity-100'}`}>
            <Title level={3}>
                {title}
            </Title>
            <div className="flex items-center justify-between w-full min-h-10">
                <p className="text-base">
                    {description}
                </p>
                {actionButtonLink &&
                    <Link href={actionButtonLink}>
                        <a>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center">
                                <ArrowRightOutlined />
                            </button>
                        </a>
                    </Link>
                }
            </div>
        </Card>

    );
}
