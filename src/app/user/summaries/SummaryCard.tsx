"use client";

import React from "react";
import Markdown from "react-markdown";

interface SummaryCardProps {
  title: string;
  summary: string;
  videoPath: string;
}

export default function SummaryCard({
  title,
  summary,
  videoPath,
}: SummaryCardProps) {
  return (
    <>
      <div className="card bg-base-300 shadow-md rounded-lg p-4 border border-primary hover:shadow-lg transition">
        <figure>
          <video
            className="w-full h-48 object-cover rounded-md mb-4"
            controls
            src={`/${videoPath}`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-bold mb-2">{title}</h2>
          <div className="text-sm text-base-content/90 whitespace-pre-wrap">
            <Markdown>{summary.slice(0, 100) + "..."}</Markdown>
          </div>
        </div>
        <div className="px-4 pb-4 flex items-center space-x-2">
          <a
            href={`/${videoPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Watch Video
          </a>
          <button
            className="btn btn-outline btn-sm ml-auto"
            onClick={() => {
              (
                document.getElementById("readMoreDialog") as HTMLDialogElement
              ).showModal();
            }}
          >
            Read More
          </button>
        </div>
      </div>
      <dialog id="readMoreDialog" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg text-center">
            Full Summary for: {title}
          </h3>
          <figure>
            <video
              className="w-full h-64 object-cover rounded-md my-4"
              controls
              src={`/${videoPath}`}
            />
          </figure>
          <p className="py-4">
            <Markdown>{summary}</Markdown>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
