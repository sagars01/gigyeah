"use client"
import React, { useEffect, useState } from 'react';

import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import Loading from '../libs/components/reusables/loading';
import Head from 'next/head';

const DashboardLayout = ({ children }: React.PropsWithChildren) => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <html lang="en">
            <Head>
                <title>Dashboard</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <Head>
                <meta property="og:title" content="My new title" key="title" />
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
        </html>
    )
};

export default DashboardLayout;