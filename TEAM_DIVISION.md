# Team Division: Crowdfunding Backend (Kickstarter Clone)

**Team Members:** [Aidarkhan] & [Arman]

---

### [Aidarkhan]:  (Catalog & Infrastructure)
**Responsibility:** Project Foundation and Content Management
* [ ] **Initial Setup:** Project structure, Express server, and DB connection.
* [ ] **User Module:** Auth/Registration and JWT logic.
* [ ] **Project Module:** CRUD for projects (Create, Read, Update, Delete).
* [ ] **Tiers Module:** Logic for creating reward tiers for specific projects.
* [ ] **Documentation:** Basic README and setup instructions.

---

###  [Arman]:  (Finances & Logic)
**Responsibility:** Business Logic, Transactions, and Finalization
* [ ] **Pledge System:** Implementation of the POST /pledges endpoint.
* [ ] **Transactions:** Atomic decrement of tier quantities (preventing overselling).
* [ ] **Deadline Enforcement:** Validation logic to prevent pledges after project end.
* [ ] **Project Finalization:** System to mark projects as Successful/Failed and handle refunds.
* [ ] **API Spec:** Comprehensive Postman collection and API_SPEC.md.