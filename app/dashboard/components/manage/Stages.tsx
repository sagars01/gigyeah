import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';



const App: React.FC<StagesProps> = ({ onChangeEvt }) => {
    const [current, setCurrent] = useState(0);

    const stagesList: any = [
        {
            title: 'Applied',
            key: 'applied'
        },
        {
            title: 'Shortlisted',
            key: 'shortlisted'
        },
        {
            title: 'Interviewing',
            key: 'interview'
        },
        {
            title: 'Hired',
            key: 'hired'
        }
    ];


    const onChange = (value: number) => {
        onChangeEvt(stagesList[value].key)
        setCurrent(value);
    };

    return (
        <>
            <Steps
                type="navigation"
                size="small"
                current={current}
                onChange={onChange}
                responsive={true}
                className="site-navigation-steps mb-10"
                items={stagesList}
            />

        </>
    );
};

export default App;

interface StagesProps {
    onChangeEvt: (stageName: string) => void;
    currentStage?: number //TODO: Update stage based on route query param
}