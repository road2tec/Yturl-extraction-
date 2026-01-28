"use client";

import React from "react";
import Markdown from "react-markdown";
import { useTextToSpeech } from "../../../hooks/useTextToSpeech";

interface HighlightCardProps {
  title: string;
  highlights: string[];
  videoPath: string;
}

export default function HighlightCard({
  title,
  highlights,
  videoPath,
}: HighlightCardProps) {
  const { speak, isSpeaking, cancel } = useTextToSpeech();
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
            <Markdown>{highlights[0].slice(0, 100) + "..."}</Markdown>
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
            className="btn btn-secondary btn-sm"
            onClick={() => (isSpeaking ? cancel() : speak(highlights[0]))}
          >
            {isSpeaking ? "Stop" : "Listen"}
          </button>
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
            Full Highlight for: {title}
          </h3>
          <figure>
            <video
              className="w-full h-64 object-cover rounded-md my-4"
              controls
              src={`/${videoPath}`}
            />
          </figure>
          <div className="py-4 space-y-2">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <button
                  className="btn btn-circle btn-xs btn-ghost mt-1 shrink-0"
                  onClick={() => (isSpeaking ? cancel() : speak(highlight))}
                  title="Listen"
                >
                  🔊
                </button>
                <div className="flex-1">
                  <Markdown>{`- ${highlight}\n`}</Markdown>
                </div>
              </div>
            ))}
          </div>
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
