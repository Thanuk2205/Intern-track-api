import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    appliedDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Applied", "Interviewing", "Accepted", "Rejected"],
        default: "Applied"
    },
    jobLink: {
        type: String,
        default: ""
    },
    notes: {
        type: String,
        default: ""
    }
});

export default mongoose.model("applications", applicationSchema);