import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Summary from "@/models/Summary";
import Highlight from "@/models/Highlight";
import Quiz from "@/models/Quiz";

export async function POST(req: NextRequest) {
  try {
    const { result, videoPath, videoTitle } = await req.json();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decodedId = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const userId = decodedId.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const summary = new Summary({
      userId,
      videoPath,
      videoTitle,
      summary: result.summary || "No summary generated",
    });
    await summary.save();
    const highlights = new Highlight({
      userId,
      videoPath,
      videoTitle,
      highlights: result.highlights || [],
    });
    await highlights.save();
    const quizData = new Quiz({
      userId,
      videoPath,
      videoTitle,
      quiz: result.quiz || [],
    });
    await quizData.save();
    return NextResponse.json({ message: "Results saved successfully" });
  } catch (error) {
    console.log("Error saving results:", error);
    return NextResponse.json(
      { error: "Error saving results" },
      { status: 500 }
    );
  }
}
