"use client";

import { useState } from "react";

export default function SubmitCodePage() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  
const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        language,
        code,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Code snippet saved successfully!");

      setTitle("");
      setLanguage("JavaScript");
      setCode("");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Code</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter snippet title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option>JavaScript</option>
          <option>Python</option>
          <option>Java</option>
          <option>C++</option>
        </select>

        <textarea
          rows={12}
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
  onClick={handleSubmit}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg"
>
  Submit Code
</button>
      </div>
    </div>
  );
}