## Car-Mangement

# Overview

Car-Mangement is a marketplace for second-hand cars where dealers can list their inventory, and buyers can browse and purchase cars. This application helps streamline the process for both parties, ensuring an efficient and user-friendly experience.

# Features

# Phase I: Frontend App

# Signup and Login: User authentication for secure access.

# Add Car Details: Dealers can add second-hand car details, including specifications and images.

# Filters: Filter cars based on price, colors, and mileage.

# Car Management: Dealers can view, edit, and delete car listings.

# Phase II: Database Design

- Designed tables for OEM Specifications and Marketplace Inventory.

- Created tables with dummy data to test functionality.

# Phase III: API Implementation

- Available Models API: Fetch the number of OEM models.

- Search API: Retrieve specifications for specific car models (e.g., Honda City 2015).

- Technology Stack: Python (Django/Flask) or Node.js for backend and database of choice.

# Folder Structure

Car-Mangement/
├── backend/
│   ├── app/
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Logic for handling requests
│   │   └── app.js        # Main backend application
│   └── package.json      # Dependencies and scripts
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Application pages (Signup, Login, etc.)
│   │   ├── assets/       # Images, stylesheets
│   │   └── App.js        # Main React application
│   └── package.json      # Dependencies and scripts
├── database/
│   ├── schema.sql        # Database schema
│   └── dummy_data.sql    # Dummy data for testing
├── snapshots/            # Screenshots of the application
├── README.md             # Project documentation
└── .env                  # Environment variables

How to Add Snapshots

To include snapshots in your README file:

Save your screenshots in the snapshots/ folder.

Reference the snapshots in the README using Markdown syntax:

![Description of the screenshot](snapshots/filename.png)

Example:

Signup Page:


Add Car Details Page:


Getting Started

Prerequisites

Node.js and npm

Python (if using Django/Flask backend)

Database setup (e.g., MySQL, PostgreSQL, MongoDB)

Installation

Clone the repository:

git clone https://github.com/your-repo/BUYC-Com.git

Install frontend dependencies:

cd frontend
npm install

Install backend dependencies:

cd ../backend
npm install

Set up the database:

Execute schema.sql and dummy_data.sql in your database.

Configure environment variables in the .env file.

Running the Application

Start the backend:

cd backend
npm start

Start the frontend:

cd frontend
npm start

API Documentation

Fetch OEM Models

Endpoint: /api/oem/models
Method: GET

Search OEM Specs

Endpoint: /api/oem/specs
Method: GET
Query Parameters:

modelName (required)

year (optional)
