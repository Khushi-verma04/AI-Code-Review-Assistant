"use client";

import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");

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
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6"
      />

      <select
        value={languageFilter}
        onChange={(e) => setLanguageFilter(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6"
      >
        <option value="All">All Languages</option>
        <option value="JavaScript">JavaScript</option>
        <option value="C++">C++</option>
      </select>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews
          .filter((review: any) => {
            const matchTitle = review.title
              ?.toLowerCase()
              .includes(search.toLowerCase());

            const matchLanguage =
              languageFilter === "All" ||
              review.language === languageFilter;

            return matchTitle && matchLanguage;
          })
          .map((review: any) => (


            <div
              key={review.id}
              className="border rounded-lg p-4 mb-4 shadow"
            >
              <h2 className="text-xl font-bold">{review.title}</h2>

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