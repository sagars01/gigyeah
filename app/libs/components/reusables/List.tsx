import React from 'react';

interface ListComponentProps {
    items: string[] | undefined;
}

const ListComponent: React.FC<ListComponentProps> = ({ items }) => {
    return (
        <div className="relative flex flex-col text-gray-700 bg-white">
            <nav className="flex min-w-[240px] flex-col gap-1 py-2 font-sans text-base font-normal text-blue-gray-700">
                {items?.map((item, index) => (
                    <div
                        key={index}
                        role="button"
                        className="flex items-center w-full py-3 leading-tight"
                    >
                        {item}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default ListComponent;
