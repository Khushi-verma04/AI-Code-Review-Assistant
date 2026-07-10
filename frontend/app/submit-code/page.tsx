"use client";

import { useState } from "react";

export default function SubmitCodePage() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<any[]>([]);
  
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
      console.log(data);

      if (response.ok) {
        setAnalysis(data.analysis);
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
        {analysis.length > 0 && (
          <div className="mt-6 border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-3">Static Code Analysis</h2>

           {analysis.length > 0 && analysis[0]?.messages?.length === 0 ? (
              <p>No issues found ✅</p>
            ) : (
              analysis[0]?.messages?.map((item: any, index: number) => (
                <div key={index} className="mb-2">
                  <p><strong>Line:</strong> {item.line}</p>
                  <p><strong>Message:</strong> {item.message}</p>
                  <p><strong>Rule:</strong> {item.ruleId}</p>
                  <hr className="my-2" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}