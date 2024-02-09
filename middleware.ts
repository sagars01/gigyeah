import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/",
        "/jobs/apply",
        "/api/job/public",
        "/api/job/apply"
    ],
    debug: true
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};