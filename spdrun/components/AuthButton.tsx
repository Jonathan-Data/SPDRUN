"use client";
import { signInWithGoogle, logout } from "@/lib/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/auth";

export default function AuthButton() {
    const [user, loading] = useAuthState(auth);

    if (loading) return <div>Loading...</div>;

    return user ? (
        <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
            Sign Out
        </button>
    ) : (
        <button
            onClick={signInWithGoogle}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
            Sign In with Google
        </button>
    );
}