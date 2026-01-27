export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  role: "user" | "admin";
}

export interface Summary {
  _id: string;
  videoTitle: string;
  summary: string;
  videoPath: string;
}

export interface Highlight {
  _id: string;
  videoTitle: string;
  highlights: string[];
  videoPath: string;
}

export interface QuizQuestion {
  userId: string;
  videoPath: string;
  videoTitle: string;
  quiz: {
    question: string;
    options: string[];
    answer: string;
  }[];
}
