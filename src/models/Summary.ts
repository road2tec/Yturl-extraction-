import mongoose, { Schema } from "mongoose";

const SummarySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoPath: { type: String, required: true },
    videoTitle: { type: String, required: true },
    summary: { type: String, required: true },
})

const Summary = mongoose.models.Summary || mongoose.model("Summary", SummarySchema);
export default Summary;