import URL from '@/app/utils/constants/url/url';
import Link from 'next/link';
import { useWindowDimensions } from '@/app/utils/ui/getWindowDims.utils';  // Import your custom hook

interface Props {
    orientation?: 'vertical' | 'horizontal';
}

const ResponsiveLogo: React.FC<Props> = ({ orientation }) => {
    const { width, height } = useWindowDimensions(); // Extract height from the custom hook



    return (
        <Link href={'/'}>
            {
                orientation ? (
                    <img
                        src={
                            orientation === "vertical" ? URL.assets.branding.logov : URL.assets.branding.logoh
                        }
                        alt="Company Logo"
                    />
                ) : (
                    <>
                        <img
                            src={
                                width && width > 720 ? URL.assets.branding.logov : URL.assets.branding.logoh
                            }
                            className={width && width < 720 ? 'w-1/12' : 'w-1/3'}
                            alt="Company Logo"
                        />
                    </>
                )
            }

        </Link>
    );
};

export default ResponsiveLogo;
