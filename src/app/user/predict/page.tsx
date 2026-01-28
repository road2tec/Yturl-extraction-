"use client";

import {
  IconCheck,
  IconClock,
  IconCloudUpload,
  IconFile,
  IconFolder,
  IconPlayerPlay,
  IconRotateClockwise,
  IconUpload,
} from "@tabler/icons-react";
import axios from "axios";
import { useState, useRef } from "react";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import { useTextToSpeech } from "../../../hooks/useTextToSpeech";

export default function PredictPage() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const { speak, isSpeaking, cancel } = useTextToSpeech();

  const handleChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };
  const [options, setOptions] = useState({
    generateSummary: true,
    generateHighlights: true,
    generateQuiz: true,
    generateTimeline: true,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a video file.");
    setLoading(true);

    try {
      const res = axios.postForm("/api/predict/video", {
        video: file,
        ...options,
      });
      toast.promise(res, {
        loading: "Processing video...",
        success: (data) => {
          console.log(data.data.result.quiz);
          setResult(data.data.result);
          return "Video processed successfully!";
        },
        error: "Error processing video",
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the video.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResults = () => {
    const response = axios.post("/api/user/saveResults", {
      result,
      videoPath: `videos/${file?.name}`,
      videoTitle: file?.name,
    });
    toast.promise(response, {
      loading: "Saving results...",
      success: () => {
        window.location.reload();
        return "Results saved successfully!";
      },
      error: "Error saving results",
    });
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  const jumpToTime = (timeRange: string) => {
    if (!videoRef.current) return;
    // Simple parser for "0-1 min", "3-5 min" etc.
    const match = timeRange.match(/(\d+)/);
    if (match) {
      const minutes = parseInt(match[0]);
      videoRef.current.currentTime = minutes * 60;
      videoRef.current.play();
      videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4 py-5 bg-secondary/90 rounded-md text-center text-secondary-content">
        🎥 Predict – Process Your Video
      </h1>

      <div className="card max-w-3xl mx-auto bg-base-300 shadow-md p-6 space-y-4">
        <div className="w-full mb-5">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center py-9 w-full border border-primary border-dashed rounded-2xl cursor-pointer bg-base-200 hover:bg-base-300"
          >
            <div className="mb-3 flex items-center justify-center">
              <IconCloudUpload size={50} />
            </div>
            <h2 className="text-center text-base-content text-xs font-normal leading-4 mb-1">
              MP4, AVI, MOV up to 500MB
            </h2>
            <h4 className="text-center text-base-content/60 text-sm font-medium leading-snug">
              Drag and Drop your file here or
            </h4>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <div className="mt-3 btn btn-primary btn-sm">
              <IconFolder className="mr-2" />{" "}
              {file ? (
                <span className="flex items-center gap-2">
                  <IconFile /> {file.name}
                </span>
              ) : (
                "Browse Files"
              )}
            </div>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <fieldset className="fieldset">
            <legend className="flex items-center justify-between gap-4">
              <span className="legend text-base">Generate Summary </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={options.generateSummary}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    generateSummary: e.target.checked,
                  }))
                }
              />
            </legend>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="flex items-center justify-between gap-4">
              <span className="legend text-base">Generate Highlights </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={options.generateHighlights}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    generateHighlights: e.target.checked,
                  }))
                }
              />
            </legend>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="flex items-center justify-between gap-4">
              <span className="legend text-base">Generate Quiz </span>
              <input
                type="checkbox"
                className={`toggle toggle-primary`}
                checked={options.generateQuiz}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    generateQuiz: e.target.checked,
                  }))
                }
              />
            </legend>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="flex items-center justify-between gap-4">
              <span className="legend text-base">Generate Timeline </span>
              <input
                type="checkbox"
                className={`toggle toggle-primary`}
                checked={options.generateTimeline}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    generateTimeline: e.target.checked,
                  }))
                }
              />
            </legend>
          </fieldset>
        </div>
        <button
          onClick={handleUpload}
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <IconRotateClockwise className="animate-spin mr-2" />{" "}
              Processing...
            </>
          ) : (
            <>
              <IconUpload className="mr-2" /> Upload & Analyze
            </>
          )}
        </button>
      </div>
      {result && (
        <div className="space-y-6">
          <div className="alert alert-success">
            <IconCheck className="mr-2" /> Video processed successfully!
          </div>
          <button
            className="btn btn-outline btn-accent w-full"
            onClick={handleSaveResults}
          >
            Save Results
          </button>

          {/* Video Player */}
          <div className="card bg-base-200 shadow p-4">
            <h2 className="text-2xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
              <IconPlayerPlay /> Watch Video
            </h2>
            <div className="flex justify-center">
              <video
                ref={videoRef}
                controls
                className="w-full max-w-2xl rounded-lg border-2 border-primary shadow-lg"
                src={`/${result.videoPath}`}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {/* Summary */}
          <div className="card bg-base-200 shadow p-4">
            <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
              📌 Summary
              <button
                className="btn btn-circle btn-sm btn-ghost"
                onClick={() =>
                  isSpeaking ? cancel() : speak(result.summary)
                }
                title="Listen to Summary"
              >
                {isSpeaking ? (
                  <span className="loading loading-bars loading-xs"></span>
                ) : (
                  "🔊"
                )}
              </button>
            </h2>
            <div className="mt-2 text-base-content/90 p-10 space-y-2">
              <Markdown>{result.summary}</Markdown>
            </div>
          </div>

          {/* Highlights */}
          <div className="card bg-base-200 shadow p-4">
            <h2 className="text-2xl font-semibold text-center">
              💡 Highlights
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-2 text-base-content/90 p-10">
              {result.highlights?.map((h: string, i: number) => (
                <Markdown key={i}>{h}</Markdown>
              ))}
            </ul>
          </div>
          {/* Timeline */}
          {result.timeline && result.timeline.length > 0 && (
            <div className="card bg-base-200 shadow p-4">
              <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
                <IconClock size={28} /> Timeline Breakdown
              </h2>
              <div className="mt-4 space-y-4 p-5">
                {result.timeline.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex gap-4 border-l-2 border-primary pl-4 py-2 hover:bg-base-300 cursor-pointer transition-colors rounded-r-md"
                    onClick={() => jumpToTime(item.timeRange)}
                  >
                    <div className="min-w-fit">
                      <span className="badge badge-primary font-mono">{item.timeRange}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.topic}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-base-content/80">{item.description}</p>
                        <button
                          className="btn btn-circle btn-xs btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            isSpeaking ? cancel() : speak(item.description);
                          }}
                          title="Listen"
                        >
                          🔊
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quizzes */}
          {result.quiz && result.quiz.length > 0 && (
            <div className="card bg-base-200 shadow p-4">
              <h2 className="text-2xl font-semibold text-center">❓ Quiz</h2>
              <ol className="list-inside mt-2 space-y-2 text-base-content/90 p-10">
                {result.quiz.map((q: any, i: number) => (
                  <li key={i}>
                    <p className="font-medium flex items-center gap-2">
                      {i + 1}. {q.question}
                      <button
                        className="btn btn-circle btn-xs btn-ghost"
                        onClick={() =>
                          isSpeaking ? cancel() : speak(q.question)
                        }
                        title="Listen"
                      >
                        🔊
                      </button>
                    </p>
                    {q.options && (
                      <ul className="ml-5 space-y-1">
                        {q.options.map((opt: string, idx: number) => {
                          const isCorrect = opt === q.answer;
                          const isSelected = selectedAnswers[i] === opt;
                          return (
                            <li key={idx}>
                              <label
                                className={`flex items-center ${isCorrect && isSelected
                                  ? "text-success font-semibold"
                                  : ""
                                  } ${isSelected && !isCorrect ? "text-error" : ""
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
          )}
        </div>
      )}
    </div>
  );
}
