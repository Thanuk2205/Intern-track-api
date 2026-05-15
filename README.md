# Internship Application Management System

A RESTful API backend built with Node.js, Express.js, and MongoDB to help university students track and manage their internship applications.

---

## Problem Description

Undergraduate students who apply to multiple internships at the same time struggle to keep track of each application. They lose track of which companies they applied to, forget to follow up, and have no organized way to monitor their application status. This system solves that problem by providing a structured backend API to manage all internship-related data in one place.

## Target Users

- Undergraduate students applying for internships
- Final year students seeking industrial training placements

## Proposed Solution

A backend REST API that allows students to create, view, update, and delete internship application records, company details, and interview information through organized and clearly structured endpoints.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- body-parser
- Postman (for testing)
- GitHub (version control)

---

## Folder Structure

```
internship-tracker/
├── index.js
├── package.json
├── .env
├── .gitignore
├── model/
│   ├── companyModel.js
│   ├── applicationModel.js
│   └── interviewModel.js
├── controller/
│   ├── companyController.js
│   ├── applicationController.js
│   └── interviewController.js
├── routes/
│   ├── companyRoute.js
│   ├── applicationRoute.js
│   └── interviewRoute.js
└── middleware/
    └── errorHandler.js
```

---

## Folder Descriptions

### model/
Contains the Mongoose schema definitions for each collection in the MongoDB database. Each model file defines the structure, data types, required fields, and default values for a specific collection.

- **companyModel.js** — Defines the schema for the `companies` collection. Stores details about each company a student has applied to, including the company name, industry, location, and website.

- **applicationModel.js** — Defines the schema for the `applications` collection. Stores each internship application record with fields for the company reference, job role, applied date, application status (Applied, Interviewing, Accepted, Rejected), job link, and personal notes.

- **interviewModel.js** — Defines the schema for the `interviews` collection. Stores interview details linked to a specific application, including interview date, type (Online, On-site, Phone), result (Pending, Passed, Failed), and notes.

---

### controller/
Contains the business logic for handling each API request. Controllers receive the request from the route, interact with the database through the model, and send back the appropriate response. Each controller file contains the CRUD functions for its corresponding collection.

- **companyController.js** — Handles creating, fetching, updating, and deleting company records. Includes a duplicate check to prevent the same company from being added twice.

- **applicationController.js** — Handles creating, fetching all, fetching by status, updating, and deleting internship application records. Uses Mongoose populate() to include full company details in responses.

- **interviewController.js** — Handles creating, fetching all, fetching upcoming interviews within the next 7 days, updating, and deleting interview records. Uses populate() to include full application details in responses.

---

### routes/
Contains the Express route definitions that map HTTP methods and URL paths to the correct controller functions. Each route file handles the endpoints for one collection.

- **companyRoute.js** — Defines the routes for company-related API endpoints: POST /create, GET /getallcompanies, PUT /update/:id, DELETE /delete/:id.

- **applicationRoute.js** — Defines the routes for application-related API endpoints: POST /create, GET /getallapplications, GET /status/:status, PUT /update/:id, DELETE /delete/:id.

- **interviewRoute.js** — Defines the routes for interview-related API endpoints: POST /create, GET /getallinterviews, GET /upcoming, PUT /update/:id, DELETE /delete/:id.

---

### middleware/
Contains custom middleware functions used across the Express application.

- **errorHandler.js** — A centralized error handling middleware that catches and processes errors thrown anywhere in the application. Handles Mongoose validation errors, invalid ObjectId errors, duplicate key errors, and general server errors with consistent JSON responses.

---

## API Endpoints

### Company — `/api/company`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /create | Add a new company |
| GET | /getallcompanies | Get all companies |
| PUT | /update/:id | Update a company by ID |
| DELETE | /delete/:id | Delete a company by ID |

**Example Request Body (POST /create):**
```json
{
  "name": "Dialog Axiata",
  "industry": "Telecom",
  "location": "Colombo",
  "website": "https://www.dialog.lk"
}
```

---

### Application — `/api/application`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /create | Add a new application |
| GET | /getallapplications | Get all applications |
| GET | /status/:status | Get applications by status |
| PUT | /update/:id | Update an application by ID |
| DELETE | /delete/:id | Delete an application by ID |

**Example Request Body (POST /create):**
```json
{
  "company": "<companyId>",
  "jobRole": "Software Engineering Intern",
  "appliedDate": "2025-05-01",
  "status": "Applied",
  "jobLink": "https://www.dialog.lk/careers",
  "notes": "Applied through LinkedIn"
}
```

---

### Interview — `/api/interview`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /create | Schedule a new interview |
| GET | /getallinterviews | Get all interviews |
| GET | /upcoming | Get interviews in the next 7 days |
| PUT | /update/:id | Update an interview by ID |
| DELETE | /delete/:id | Delete an interview by ID |

**Example Request Body (POST /create):**
```json
{
  "application": "<applicationId>",
  "interviewDate": "2025-05-20",
  "interviewType": "Online",
  "result": "Pending",
  "notes": "Technical round with the engineering team"
}
```

---

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/your-username/internship-tracker.git
cd internship-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root folder
```
PORT=5000
MONGO_URL=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/internshipDB?retryWrites=true&w=majority
```

4. Start the server
```bash
npm start
```

---

## How to Run the Project

```bash
npm start
```

Expected output:
```
Database connected successfully
Server is running on 5000
```

The API will be available at `http://localhost:5000`

---

## Database

- **Database Name:** internshipDB
- **Collections:** companies, applications, interviews
- Collections are created automatically when the first record is inserted via the API.

---

## Author

##Ranabahu Athukoralage Thanuk Gimantha
##2022/ICT/27
##Module: Web Services and Server Technology (IT2234)
