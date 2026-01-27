"use client";

import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import Loading from "@/components/Loading";
import axios from "axios";
import { Highlight } from "@/Types";
import HighlightCard from "./HightLightCard";

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHighlights = async (search = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/highlights`);
      setHighlights(res.data.highlights);
    } catch (err) {
      console.error("Error fetching highlights:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  const filteredHighlights = highlights.filter(
    (highlight) =>
      highlight.videoTitle.toLowerCase().includes(query.toLowerCase()) ||
      highlight.highlights.some((h) =>
        h.toLowerCase().includes(query.toLowerCase())
      )
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4 py-5 bg-secondary/90 rounded-md text-center text-secondary-content">
        🎥 Highlights
      </h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Search Highlights</legend>
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

      {filteredHighlights.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredHighlights.map((highlight) => (
            <HighlightCard
              key={highlight._id}
              title={highlight.videoTitle}
              highlights={highlight.highlights}
              videoPath={highlight.videoPath}
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
