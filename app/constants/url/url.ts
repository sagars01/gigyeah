const DOMAIN = process.env.DOMAIN || 'www.withjessi.com';

const URL = {
    dashboard: {
        root: process.env.NODE_ENV === 'production' ? `https://${DOMAIN}/dashboard` : '/dashboard',
        viewJob: process.env.NODE_ENV === 'production' ? `https://${DOMAIN}/public/job/apply` : '/public/job/apply',
        manageApplication: process.env.NODE_ENV === 'production' ? `https://${DOMAIN}/dashboard/job/manage` : '/dashboard/job/manage',
    },
    user: {
        public: process.env.NODE_ENV === 'production' ? `https://${DOMAIN}/public/profile` : '/public/profile',
        profile: process.env.NODE_ENV === 'production' ? `https://${DOMAIN}/user/profile` : '/user/profile',
        subscription: process.env.NODE_ENV === 'production' ? `https://${DOMAIN}/user/subscription` : '/user/subscription',
        usage: process.env.NODE_ENV === 'production' ? `https://${DOMAIN}/user/usage` : '/user/usage',
    },
};

export default URL;