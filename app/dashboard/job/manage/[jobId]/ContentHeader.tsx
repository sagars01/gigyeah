"use client";

import Typography from 'antd/es/typography';
import styles from '../../../styles/applications.module.css'


const ContentHeader: React.FC<Props> = ({ jobDesc, jobTitle }) => {
    return (
        <>
            <div className={styles.headerTitle}>
                <Typography.Title level={2}>Application for {jobTitle}</Typography.Title>
            </div>
        </>
    )
}

export default ContentHeader;

interface Props {
    jobTitle: string;
    jobDesc: string;
}