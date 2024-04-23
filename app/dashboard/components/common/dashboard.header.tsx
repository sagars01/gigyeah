import React from 'react';
import Link from 'next/link';

interface LinkItem {
    title: string;
    link: string;
    isActive?: boolean;
}

interface HeaderOptionsProps {
    links: LinkItem[];
}

const DashboardHeader: React.FC<HeaderOptionsProps> = ({ links }) => {
    return (
        <div className="flex space-x-4 mr-4 ml-4">
            {links.map((item, index) => (
                <Link key={index} href={item.link}>
                    <p className={`text-sm font-medium ${item.isActive ? 'text-blue-600 text-lg' : 'text-gray-700'} hover:text-gray-900`}>
                        {item.title}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default DashboardHeader;
