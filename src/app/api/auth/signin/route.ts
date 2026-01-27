import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConfig from "@/config/db.config";

dbConfig();

const createTokenAndResponse = (data: object, route: string) => {
  const token = jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "7d" });
  const response = NextResponse.json({
    message: "Login successful",
    route,
    token,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
  });
  return response;
};

export async function POST(req: NextRequest) {
  const { formData } = await req.json();
  const { email, password } = formData || {};
  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }
  try {
    // Super admin shortcut
    if (email === "admin@neurostream.com" && password === "Admin@123") {
      return createTokenAndResponse(
        {
          id: "Admin",
          email,
          role: "Admin",
          name: "Admin",
          profileImage:
            "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg",
          isVerified: true,
        },
        "/admin/dashboard"
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Account with this email does not exist" },
        { status: 404 }
      );
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const data = {
      id: user._id,
      name: user.name,
      profileImage: user.profileImage,
      email: user.email,
      role: "user",
    };

    return createTokenAndResponse(data, "/user/dashboard");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while logging in" },
      { status: 500 }
    );
  }
}
