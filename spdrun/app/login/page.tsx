import AuthButton from "@/components/AuthButton";

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">SPDRUN Login</h1>
                <AuthButton />
            </div>
        </div>
    );
}