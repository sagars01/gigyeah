import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/",
        "/jobs/apply",
        "/api/job/public",
        "/api/job/apply(.*)",
        "/api/webhooks(.*)"
    ],
    debug: Boolean(process.env.DEBUG_CLERK) || false
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};