# My Portfolio API

Backend API for my personal portfolio website.

#### Built with:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Cloudinary
- JWT Authentication
- bcrypt

## Features

- User authentication
- Portfolio home/about information
- Skills management
- Projects management
- Image uploads through Cloudinary
- Protected create, update, and delete routes

---

## Getting Started

### 1. Clone the repository

`git clone https://github.com/nandweza/portfolio-api.git `

`cd portfolio-api`

### 2. Install dependencies

`npm install`

### 3. Create environment variables

Create a .env file in the root directory.

```Markdown
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Do not commit .env to Github. Add it to .gitignore file in the root directory.

## Running the API

### Development

`npm run dev`

The API will run on:

`http://localhost:3000`

### Production

`[Live API](https://portfolio-api-emkd.onrender.com/)`

Build the project:

`npm run build`

Then start the server:

`npm start`

## API Endpoints

Base URL:

`http://localhost:3000/api`

### Authentication

Login

`POST /api/auth/login`

The login response returns an authentication token. For protected routes, send token using;

`Authorization: Bearer YOUR_TOKEN`

### Home

`GET /api/home`This endpoint returns the portfolio home/about information

`POST /api/home` This endpoint requires authentication to add or create home page data.

`PATCH /api/home/:id`Requires authentication to update data

`DELETE /api/home/:id` Requires authentication to delete data


### Skills

`GET /api/skill`This endpoint returns skill information

`GET /api/skill/:category`This endpoint returns skill by category

`POST /api/skill` This endpoint requires authentication to add a skill.

Example

```Markdown
{
    "name": "React",
    "category": ["frontend", "frameworks"],
    "iconKey": "FaReact",
    "iconColor": "#904747",
}
```

`PATCH /api/skill/:id`Requires authentication to update a skill

`DELETE /api/skill/:id` Requires authentication to delete a skill


### Projects

`GET /api/project`This endpoint returns all the projects

`POST /api/project` This endpoint requires authentication to add a project. 

Uses `multipart/form-data`

Example

```Markdown
title: My Portfolio
description: Personal portfolio website
techStack: React, Node.js, MongoDB
liveUrl: https://example.com
codeUrl: https://github.com/example/project
image: <image file>
```

`PATCH /api/project/:id`Requires authentication to update a project

`DELETE /api/project/:id` Requires authentication to delete a project. The associated Cloudinary image is also removed.


## Project Structure

```Markdown
src/
├── controllers/
│   ├── authController.ts
│   ├── homeController.ts
│   ├── projectControllers.ts
│   └── skillController.ts
│
├── db/
│   ├── home.ts
│   ├── project.ts
│   ├── skill.ts
│   └── user.ts
│
├── middleware/
│   ├── errorHandler.ts
│   ├── requireAuth.ts
│   └── upload.ts
│
├── routes/
│   ├── authRoutes.ts
│   ├── homeRoutes.ts
│   ├── projectRoutes.ts
│   ├── skillRoutes.ts
│   └── userRoutes.ts
│
├── utils/
│   ├── appError.ts
│   ├── cloudinaryDelete.ts
│   └── uploadToCloudinary.ts
│
└── index.ts
│
└── server.ts
```

### Author

Allan Kindarara
