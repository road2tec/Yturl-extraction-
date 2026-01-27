import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { generateAIInsights } from "@/helper/aiService";
import dbConfig from "@/config/db.config";
import Summary from "@/models/Summary";
import Highlight from "@/models/Highlight";
import Quiz from "@/models/Quiz";
import Timeline from "@/models/Timeline";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const { url, videoName, generateSummary, generateHighlights, generateQuiz } =
    await req.json();

  if (!url || !videoName) {
    return NextResponse.json(
      { error: "No video URL or title provided" },
      { status: 400 }
    );
  }

  if (
    !url.match(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be|m\.youtube\.com)\/.+$/) ||
    url.includes("list=")
  ) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  // Get user from token
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userId: string;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    userId = decoded.id;
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    await dbConfig();
    const uploadDir = path.join(process.cwd(), "public", "videos");
    const videoPath = path.join(uploadDir, videoName + ".mp4");

    // Step 1: Download video using Python script
    await execAsync(
      'python python/download.py "' + url + '" "' + videoPath + '"'
    );

    // Step 2: Transcribe video using Python script
    await execAsync(`python python/predict.py "${videoPath}"`);

    const extractedText = fs.readFileSync(
      path.join(process.cwd(), "tmp", "extracted_text.txt"),
      "utf-8"
    );

    // Step 3: Generate AI insights using consolidated service
    const insights = await generateAIInsights(extractedText);

    const result: any = { extractedText };

    // Step 4: Persistence and Result Mapping
    const commonData = {
      userId,
      videoPath: `videos/${videoName}.mp4`,
      videoTitle: videoName,
    };

    if (generateSummary) {
      const summaryText = insights.summary.map(s => `- ${s}`).join("\n");
      result.summary = summaryText;
      await Summary.create({ ...commonData, summary: summaryText });
    }

    if (generateHighlights) {
      result.highlights = insights.highlights;
      await Highlight.create({ ...commonData, highlights: insights.highlights });
    }

    if (generateQuiz) {
      result.quiz = insights.quiz;
      await Quiz.create({ ...commonData, quiz: insights.quiz });
    }

    if (insights.timeline) {
      result.timeline = insights.timeline;
      await Timeline.create({ ...commonData, timeline: insights.timeline });
    }

    result.videoPath = `videos/${videoName}.mp4`;
    result.videoTitle = videoName;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json(
      { error: "Error processing video" },
      { status: 500 }
    );
  }
}
