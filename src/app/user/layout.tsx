"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import Loading from "@/components/Loading";
import Navbar from "./Navbar";

const Component = ({ children }: { children: React.ReactNode }) => {
  const { setUser, user } = useAuth();
  const fetchUser = async () => {
    const response = await axios.get("/api/auth/verifytoken");
    if (response.data) {
      setUser(response.data.user);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <title>
          User | NeuroStream - Turn Videos into Knowledge – Learn Smarter,
          Faster with NeuroStream
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="NeuroStream is an AI-powered platform that transforms video content into structured summaries, highlights, and quizzes. Perfect for students, professionals, and content creators, NeuroStream enhances learning and knowledge retention by converting videos into actionable insights with ease."
        />
      </head>
      <body className="antialiased">
        {!user ? (
          <Loading />
        ) : (
          <div className={`alan-sans max-h-screen mt-[7rem] lg:px-10`}>
            <Toaster />
            <Navbar />
            {children}
          </div>
        )}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
