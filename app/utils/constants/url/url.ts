const env = process.env.NODE_ENV;

function createURL(path: string) {
    return path;
}

const URL = {
    dashboard: {
        root: createURL('/dashboard'),
        viewJob: createURL('/public/job/apply'),
        manageApplication: createURL('/dashboard/job/manage'),
    },
    user: {
        clerkUser: createURL(process.env.NEXT_PUBLIC_USER_PROFILE || '/user'),
        public: createURL('/public/profile'),
        profile: createURL('/user/profile'),
        subscription: createURL('/user/subscription'),
        usage: createURL('/user/usage'),
    },
    api: {
        public: {
            job: {
                apply: '/api/job/public/apply',
            }
        },
        private: {
            jobs: {
                fetch: '/job/fetch',
                update: '/job/update'
            },
            application: {
                update: '/application/update'
            },
            ai: {
                summarize: '/ai/summarize'
            }
        }
    },
    assets: {
        branding: {
            logoh: '/img/logo/logo_h.png',
            logov: '/img/logo/logo_v.png'
        }
    }
};

export default URL;
