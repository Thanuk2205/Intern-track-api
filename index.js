import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import companyRoute from './routes/companyRoute.js';
import applicationRoute from './routes/applicationRoute.js';
import interviewRoute from './routes/interviewRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    }).catch((error) => console.log(error));

app.use('/api/company', companyRoute);
app.use('/api/application', applicationRoute);
app.use('/api/interview', interviewRoute);