"use client";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          NeuroStream - Turn Videos into Knowledge – Learn Smarter, Faster with
          NeuroStream
        </title>
        <meta
          name="description"
          content="NeuroStream is an AI-powered platform that transforms video content into structured summaries, highlights, and quizzes. Perfect for students, professionals, and content creators, NeuroStream enhances learning and knowledge retention by converting videos into actionable insights with ease."
        />
      </head>
      <body>
        <Toaster position="top-right" gutter={8} toasterId="root" />
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Component>{children}</Component>;
}
