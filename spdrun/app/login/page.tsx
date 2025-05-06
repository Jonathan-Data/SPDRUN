"use client";
import { loginWithProvider } from "@/lib/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthButton from "@/components/AuthButton";

export default function LoginPage() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) router.push('/');
    }, [user]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="loader">Loading...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-white">SPDRUN Login</h1>

                <div className="space-y-4">
                    <AuthButton
                        provider="google"
                        onClick={() => loginWithProvider('google')}
                    />
                    <AuthButton
                        provider="github"
                        onClick={() => loginWithProvider('github')}
                    />
                </div>

                <div className="text-center text-gray-400 text-sm">
                    By logging in, you agree to our Terms and Privacy Policy
                </div>
            </div>
        </div>
    );
}