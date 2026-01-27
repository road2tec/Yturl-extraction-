"use client";

import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import Loading from "@/components/Loading";
import axios from "axios";
import { QuizQuestion } from "@/Types";
import HighlightCard from "./QuizCard";
import QuizCard from "./QuizCard";

export default function QuizCardPage() {
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async (search = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/quizzes`);
      setQuizzes(res.data.quizzes);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.videoTitle.toLowerCase().includes(query.toLowerCase()) ||
      quiz.quiz.some((q) =>
        q.question.toLowerCase().includes(query.toLowerCase())
      )
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4 py-5 bg-secondary/90 rounded-md text-center text-secondary-content">
        🎥 Quizzes
      </h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Search Quizzes</legend>
        <div className="join">
          <input
            type="text"
            placeholder="Search by title or content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-primary join-item w-full"
          />
          <button type="submit" className="btn btn-primary join-item">
            <IconSearch className="mr-2" size={16} />
            Search
          </button>
        </div>
      </fieldset>

      {filteredQuizzes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz, index) => (
            <QuizCard key={index} {...quiz} />
          ))}
        </div>
      ) : (
        <p className="text-base-content text-2xl text-center">
          No summaries found.
        </p>
      )}
    </div>
  );
}
