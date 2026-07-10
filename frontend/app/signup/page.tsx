"use client";

import { useState } from "react";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup successful!");

                setName("");
                setEmail("");
                setPassword("");
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
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

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
                    onClick={handleSignup}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}