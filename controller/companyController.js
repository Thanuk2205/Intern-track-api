import Company from "../model/companyModel.js";

export const create = async (req, res) => {
    try {
        const companyData = new Company(req.body);
        const { name } = companyData;
        const companyExist = await Company.findOne({ name });
        if (companyExist) {
            return res.status(400).json({ message: "Company already exists!" });
        }
        const savedCompany = await companyData.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetch = async (req, res) => {
    try {
        const companies = await Company.find();
        if (companies.length === 0) {
            return res.status(404).json({ message: "Companies not found!" });
        }
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const companyExist = await Company.findOne({ _id: id });
        if (!companyExist) {
            return res.status(404).json({ message: "Company not found!" });
        }
        const updateCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateCompany);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const id = req.params.id;
        const companyExist = await Company.findOne({ _id: id });
        if (!companyExist) {
            return res.status(404).json({ message: "Company not found!" });
        }
        await Company.findByIdAndDelete(id);
        res.status(201).json({ message: "Company deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}