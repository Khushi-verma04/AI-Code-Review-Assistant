"use client";

import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/snippets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setReviews(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter((review: any) => {
    const matchTitle = review.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchLanguage =
      languageFilter === "All" ||
      review.language === languageFilter;

    return matchTitle && matchLanguage;
  });

  const languages = [
    "All",
    ...new Set(
      reviews
        .map((review: any) => review.language)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={languageFilter}
        onChange={(e) => setLanguageFilter(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : filteredReviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        filteredReviews.map((review: any) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-bold">
              {review.title || "Untitled"}
            </h2>

            <p>
              <strong>Language:</strong> {review.language}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(review.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}