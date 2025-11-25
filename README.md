# Student Portal / Course Helper App (Backend)

This is the backend for a Student Portal / Course Helper app. It lets students manage courses and tasks (assignments, exams, projects) with due dates and statuses.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Token) authentication
- CORS, dotenv

## Project Structure

- `server/` - Node.js backend
  - `src/index.js` - main entry point
  - `src/config/db.js` - MongoDB connection
  - `src/models/` - Mongoose models (User, Course, Task)
  - `src/routes/` - Auth, Course, Task routes
  - `src/middleware/authMiddleware.js` - JWT protection


1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file in `server/` based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student_portal
JWT_SECRET=supersecretchangeme
```

3. Run the backend in development mode:

```bash
npm run dev
```

4. Test endpoints with a REST client (Postman, Thunder Client, etc.):

- `POST /api/auth/register`
- `POST /api/auth/login`
- Use `Authorization: Bearer <token>` for:
  - `GET /api/courses`
  - `POST /api/courses`
  - `GET /api/tasks`
  - `POST /api/tasks`


