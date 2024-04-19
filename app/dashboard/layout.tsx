"use client"
import React, { useEffect, useState } from 'react';

import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import Loading from '../libs/components/reusables/loading';

const DashboardLayout = ({ children }: React.PropsWithChildren) => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <html lang="en">
            <body>
                {
                    isClient && (
                        <ClerkProvider>
                            <ClerkLoading>
                                <Loading />
                            </ClerkLoading>
                            {children}
                        </ClerkProvider>
                    )
                }

            </body>
        </html>
    )
};

export default DashboardLayout;

/**
 * 
 * <ClerkProvider>
                <ClerkLoading>
                    <div className="loader"></div>
                </ClerkLoading>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </ClerkProvider>
 * 
 * 
 */