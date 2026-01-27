import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

const QuizSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  videoPath: { type: String, required: true },
  videoTitle: { type: String, required: true },
  quiz: { type: [QuestionSchema], required: true },
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
export default Quiz;
