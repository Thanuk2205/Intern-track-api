import Interview from "../model/interviewModel.js";

export const create = async (req, res) => {
    try {
        const interviewData = new Interview(req.body);
        const savedInterview = await interviewData.save();
        res.status(201).json(savedInterview);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetch = async (req, res) => {
    try {
        const interviews = await Interview.find().populate("application");
        if (interviews.length === 0) {
            return res.status(404).json({ message: "Interviews not found!" });
        }
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const fetchUpcoming = async (req, res) => {
    try {
        const today = new Date();
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        const interviews = await Interview.find({
            interviewDate: { $gte: today, $lte: next7Days },
            result: "Pending"
        }).populate("application");

        if (interviews.length === 0) {
            return res.status(404).json({ message: "No upcoming interviews found!" });
        }
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const interviewExist = await Interview.findOne({ _id: id });
        if (!interviewExist) {
            return res.status(404).json({ message: "Interview not found!" });
        }
        const updateInterview = await Interview.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateInterview);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const deleteInterview = async (req, res) => {
    try {
        const id = req.params.id;
        const interviewExist = await Interview.findOne({ _id: id });
        if (!interviewExist) {
            return res.status(404).json({ message: "Interview not found!" });
        }
        await Interview.findByIdAndDelete(id);
        res.status(201).json({ message: "Interview deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}