import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-4">
                <SignIn />
            </div>
        </div>
    );
};

export default SignInPage;
