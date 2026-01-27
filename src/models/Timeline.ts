import mongoose, { Schema } from "mongoose";

const TimelineSectionSchema = new Schema({
    timeRange: { type: String, required: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
});

const TimelineSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoPath: { type: String, required: true },
    videoTitle: { type: String, required: true },
    timeline: { type: [TimelineSectionSchema], required: true },
});

const Timeline = mongoose.models.Timeline || mongoose.model("Timeline", TimelineSchema);
export default Timeline;
