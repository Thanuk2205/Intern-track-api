import express from "express";
import { create, deleteCompany, fetch, update } from "../controller/companyController.js";

const route = express.Router();

route.get("/getallcompanies", fetch);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteCompany);

export default route;