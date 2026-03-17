Markdown
# Crowdfunding Backend API (Midterm)

## Team Division
See `TEAM_DIVISION.md` for task allocations.

## Setup Instructions

### 1. Env
Create a `.env` file in the root directory and add your PostgreSQL credentials:
```env
PORT=3000
DB_USER=postgres
DB_PASS=your_password
DB_NAME=crowdfunding_db
DB_HOST=localhost
Note: Also update config/config.json with your database credentials for migrations.

2. Install
Install all required dependencies:

Bash
npm install
3. Migrate
Run the migrations to create the database tables:

Bash
npx sequelize-cli db:migrate
4. Run
Start the server:

Bash
node server.js
The server will run on http://localhost:3000.