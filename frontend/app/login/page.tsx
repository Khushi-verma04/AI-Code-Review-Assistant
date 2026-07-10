"use client";

import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);

                alert("Login successful!");

                window.location.href = "/dashboard";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Login</h1>

            <div className="space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg"
                >
                    Login
                </button>
            </div>
        </div>
    );
}