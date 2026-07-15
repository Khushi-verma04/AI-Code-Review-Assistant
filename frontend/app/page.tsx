import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        AI Code Review Assistant
      </h1>

      <p className="text-lg mb-8">
        Review your code using AI and Static Analysis
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}