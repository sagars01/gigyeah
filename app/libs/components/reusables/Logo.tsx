"use client"
import URL from '@/app/utils/constants/url/url';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const ResponsiveLogo = () => {
    const [logoUrl, setLogoUrl] = useState(URL.assets.branding.logoh); // Default to horizontal logo

    useEffect(() => {
        const handleResize = () => {
            // Check window width and switch the logo accordingly
            if (window.innerWidth < 640) { // Assuming 640px is the breakpoint for small devices
                setLogoUrl(URL.assets.branding.logov); // Use vertical logo for small screens
            } else {
                setLogoUrl(URL.assets.branding.logoh); // Use horizontal logo for larger screens
            }
        };

        // Attach the event listener for resize events
        window.addEventListener('resize', handleResize);

        // Call the resize handler once on mount to set the initial logo
        handleResize();

        // Cleanup the event listener when the component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, [logoUrl]); // Depend on logoUrls so that it updates if the URLs change

    return (
        <div className="shrink-0">
            <Link href="/">
                <img src={logoUrl} alt="Company Logo" className="h-8 w-auto sm:h-10" />
            </Link>
        </div>
    );
};

export default ResponsiveLogo;
