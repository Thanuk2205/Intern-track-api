import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
        required: true
    },
    interviewDate: {
        type: Date,
        required: true
    },
    interviewType: {
        type: String,
        enum: ["Online", "On-site", "Phone"],
        default: "Online"
    },
    result: {
        type: String,
        enum: ["Pending", "Passed", "Failed"],
        default: "Pending"
    },
    notes: {
        type: String,
        default: ""
    }
});

export default mongoose.model("interviews", interviewSchema);