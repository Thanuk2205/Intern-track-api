import Application from "../model/applicationModel.js";

export const create = async (req, res) => {
    try {
        const applicationData = new Application(req.body);
        const savedApplication = await applicationData.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetch = async (req, res) => {
    try {
        const applications = await Application.find().populate("company");
        if (applications.length === 0) {
            return res.status(404).json({ message: "Applications not found!" });
        }
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const fetchByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const applications = await Application.find({ status }).populate("company");
        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this status!" });
        }
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const applicationExist = await Application.findOne({ _id: id });
        if (!applicationExist) {
            return res.status(404).json({ message: "Application not found!" });
        }
        const updateApplication = await Application.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateApplication);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const deleteApplication = async (req, res) => {
    try {
        const id = req.params.id;
        const applicationExist = await Application.findOne({ _id: id });
        if (!applicationExist) {
            return res.status(404).json({ message: "Application not found!" });
        }
        await Application.findByIdAndDelete(id);
        res.status(201).json({ message: "Application deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}