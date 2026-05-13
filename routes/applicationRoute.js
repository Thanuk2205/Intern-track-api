import express from "express";
import { create, deleteApplication, fetch, fetchByStatus, update } from "../controller/applicationController.js";

const route = express.Router();

route.get("/getallapplications", fetch);
route.get("/status/:status", fetchByStatus);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteApplication);

export default route;