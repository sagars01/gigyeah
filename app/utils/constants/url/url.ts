const env = process.env.NODE_ENV;

function createURL(path: string) {
    let actualPath = path;
    return actualPath
}

const URL = {
    dashboard: {
        root: createURL('/dashboard'),
        viewJob: createURL('/public/job/apply'),
        manageApplication: createURL('/dashboard/job/manage'),
        repository: '/dashboard/repository'
    },
    user: {
        clerkUser: createURL(process.env.NEXT_PUBLIC_USER_PROFILE || '/user'),
        public: createURL('/public/profile'),
        profile: createURL('/user/profile'),
        subscription: createURL('/user/subscription'),
        usage: createURL('/user/usage'),
        community: {
            join: {
                discord: 'https://discord.gg/9Berd8M2'
            }
        }
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
                update: '/job/update',
            },
            application: {
                update: '/application/update'
            },
            applicant: {
                update: '/application/applicant/update'
            },
            ai: {
                summarize: '/ai/summarize',
                compare: '/ai/compare',
                generateJd: '/ai/generate-jd',
                engine: {
                    summarize: '/api/v1/summarize',
                    compare: '/api/v1/compare',
                    generateJD: '/api/v1/description'
                }
            }
        }
    },
    assets: {
        branding: {
            logoh: '/img/logo/logo_h.svg',
            logov: '/img/logo/logo_v.svg'
        },
        socialMedia: {
            twitter: 'https://twitter.com/sagar_codes'
        }
    }
};

export default URL;
