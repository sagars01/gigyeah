import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/home",
        "/jobs/apply",
        "/public",
        "/api/job/public",
        "/api/job/apply(.*)",
        "/api/webhooks(.*)",
        "/api/public/user/fetch"
    ],
    debug: Boolean(process.env.DEBUG_CLERK) || false
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};