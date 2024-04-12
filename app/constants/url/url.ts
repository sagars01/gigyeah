const DOMAIN = process.env.DOMAIN || 'www.withjessi.com';

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
        public: createURL('/public/profile'),
        profile: createURL('/user/profile'),
        subscription: createURL('/user/subscription'),
        usage: createURL('/user/usage'),
    },
};

export default URL;
