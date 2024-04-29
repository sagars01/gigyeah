"use client"
import React, { useEffect, useState } from 'react';
import './styles/dashboard.module.css'
import Head from 'next/head';

const DashboardLayout = ({ children }: React.PropsWithChildren) => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <body>
                {
                    isClient && (
                        <>

                            {children}

                        </>
                    )
                }
            </body>
        </>
    )
};

export default DashboardLayout;