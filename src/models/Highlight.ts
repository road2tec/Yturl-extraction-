import mongoose, { Schema } from "mongoose";

const HighlightSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  videoPath: { type: String, required: true },
  videoTitle: { type: String, required: true },
  highlights: { type: [String], required: true },
});

const Highlight =
  mongoose.models.Highlight || mongoose.model("Highlight", HighlightSchema);
export default Highlight;
