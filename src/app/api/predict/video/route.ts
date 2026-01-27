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
  const formData = await req.formData();
  const video = formData.get("video") as File;
  const generateSummary = formData.get("generateSummary") === "true";
  const generateHighlights = formData.get("generateHighlights") === "true";
  const generateQuiz = formData.get("generateQuiz") === "true";

  if (!video) {
    return NextResponse.json(
      { error: "No video file provided" },
      { status: 400 }
    );
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
    const buffer = Buffer.from(await video.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "videos");
    const videoPath = path.join(uploadDir, video.name);

    fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(videoPath, buffer);

    // Step 1: Transcribe video using Python script
    await execAsync(`python python/predict.py "${videoPath}"`);

    const extractedText = fs.readFileSync(
      path.join(process.cwd(), "tmp", "extracted_text.txt"),
      "utf-8"
    );

    // Step 2: Generate AI insights using consolidated service
    const insights = await generateAIInsights(extractedText);

    const result: any = { extractedText };

    // Step 3: Persistence and Result Mapping
    const commonData = {
      userId,
      videoPath: `videos/${video.name}`,
      videoTitle: video.name,
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

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error processing video:", error);
    return NextResponse.json(
      { error: "Error processing video" },
      { status: 500 }
    );
  }
}
