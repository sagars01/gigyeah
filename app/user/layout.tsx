"use client"
import React, { useEffect, useState } from 'react';

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
