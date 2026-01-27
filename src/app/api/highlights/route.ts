import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Summary from "@/models/Summary";
import Highlight from "@/models/Highlight";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decodeId = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    if (!decodeId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const highlights = await Highlight.find({ userId: decodeId.id }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, highlights }, { status: 200 });
  } catch (error) {
    console.log("Error in highlights route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
