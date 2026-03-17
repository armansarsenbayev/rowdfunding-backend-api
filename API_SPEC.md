```markdown
# API Specification

## Users
* **POST /users/register**
  * Creates a new user.
  * Body: `{ "username": "string", "email": "string", "password": "string" }`

## Projects
* **GET /projects**
  * Returns a list of all projects.
* **GET /projects/:id**
  * Returns a specific project including its creator and reward tiers.
* **POST /projects**
  * Creates a new project.
  * Body: `{ "title": "string", "goal_amount": number, "deadline": "YYYY-MM-DD", "userId": number }`
* **POST /projects/:id/tiers**
  * Adds a new reward tier to a project.
  * Body: `{ "title": "string", "amount": number, "quantity_total": number }`

## Pledges (Transactional)
* **POST /projects/:id/pledges**
  * Creates a pledge for a project. Atomically decrements reward tier quantity. Fails if deadline is passed or tier is sold out.
  * Body: `{ "userId": number, "amount": number, "tierId": number (optional) }`

## Finalize (Transactional)
* **POST /projects/:id/finalize**
  * Evaluates if the project reached its goal.
  * If successful: Updates project and pledge statuses to successful/captured.
  * If failed: Updates project status to failed, creates records in `Refunds` table, and restores reward tier quantities.