"use client";

import React, { useState } from "react";
import Markdown from "react-markdown";

interface QuizCardProps {
  videoPath: string;
  videoTitle: string;
  quiz: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export default function QuizCard({
  videoPath,
  videoTitle,
  quiz,
}: QuizCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});

  const handleChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };
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
          <h2 className="card-title text-lg font-bold mb-2">{videoTitle}</h2>
          <div className="text-sm text-base-content/90 whitespace-pre-wrap">
            <Markdown>{quiz[0].question.slice(0, 100) + "..."}</Markdown>
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
            Full Highlight for: {videoTitle}
          </h3>
          <figure>
            <video
              className="w-full h-64 object-cover rounded-md my-4"
              controls
              src={`/${videoPath}`}
            />
          </figure>
          <div className="py-4 space-y-2">
            <ol className="list-inside mt-2 space-y-2 text-base-content/90 p-10">
              {quiz.map((q: any, i: number) => (
                <li key={i}>
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                  {q.options && (
                    <ul className="ml-5 space-y-2">
                      {q.options.map((opt: string, idx: number) => {
                        const isCorrect = opt === q.answer;
                        const isSelected = selectedAnswers[i] === opt;
                        return (
                          <li key={idx}>
                            <label
                              className={`flex items-center ${
                                isCorrect && isSelected
                                  ? "text-success font-semibold"
                                  : ""
                              } ${
                                isSelected && !isCorrect ? "text-error" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="checkbox checkbox-primary mr-2"
                                checked={isSelected}
                                onChange={() => handleChange(i, opt)}
                              />
                              {opt}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
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
