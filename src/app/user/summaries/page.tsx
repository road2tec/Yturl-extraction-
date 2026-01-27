"use client";

import { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { IconSearch } from "@tabler/icons-react";
import Loading from "@/components/Loading";
import axios from "axios";
import { Summary } from "@/Types";

export default function SummariesPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSummaries = async (search = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/summaries`);
      setSummaries(res.data.summaries);
    } catch (err) {
      console.error("Error fetching summaries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const filteredSummaries = summaries.filter(
    (summary) =>
      summary.videoTitle.toLowerCase().includes(query.toLowerCase()) ||
      summary.summary.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4 py-5 bg-secondary/90 rounded-md text-center text-secondary-content">
        🎥 Summaries
      </h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Search Summaries</legend>
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

      {filteredSummaries.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSummaries.map((summary) => (
            <SummaryCard
              key={summary._id}
              title={summary.videoTitle}
              summary={summary.summary}
              videoPath={summary.videoPath}
            />
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
