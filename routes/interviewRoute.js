import express from "express";
import { create, deleteInterview, fetch, fetchUpcoming, update } from "../controller/interviewController.js";

const route = express.Router();

route.get("/getallinterviews", fetch);
route.get("/upcoming", fetchUpcoming);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteInterview);

export default route;