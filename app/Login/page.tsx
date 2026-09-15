"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (isSignUp) {
            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
            });
            if (error) {
                setError(error.message || "Sign up failed");
                return;
            }
        } else {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });
            if (error) {
                setError(error.message || "Sign in failed");
                return;
            }
        }

        router.push("/");
    }

    return (
        <main className="flex justify-center items-center py-20">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                    {isSignUp ? "Create Account" : "Sign In"}
                </h1>

                {error && (
                    <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-2 mb-3 text-blue-900"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded-lg px-4 py-2 mb-3 text-blue-900"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border rounded-lg px-4 py-2 mb-3 text-blue-900"
                    />

                    <button
                        type="submit"
                        className="text-white font-semibold bg-blue-900 rounded-lg shadow-2xl py-3 w-full mb-3"
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-blue-900">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="font-semibold underline"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </main>
    );
}