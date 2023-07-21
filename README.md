## Endpoints
**User Routes**
POST /users/signup: Register a new user.
POST /users/signin: Log in an existing user.
GET /users: Get all users

**Company Routes**
POST /companies: Create a new company 
GET /companies: Get all companies.
PATCH /companies/:id: Update a company by ID 
DELETE /companies/:id: Delete a company by ID 

**Hackathon Routes**
POST /hackathons: Create a new hackathon 
GET /hackathons: Get all hackathons.
GET /hackathons/search: Search hackathons by name and technology_stack by passing q as query param
PATCH /hackathons/:id: Update a hackathon by ID 
DELETE /hackathons/:id: Delete a hackathon by ID 
POST /hackathons/:id/register: Register a hackathon


**Participant Routes**
POST /participants/:hackathonId: Register for a hackathon.
GET /participants/:hackathonId: Get all participants for a hackathon.
PATCH /participants/:id: Update a participant by ID
DELETE /participants/:id: Delete a participant by ID
GET /participants/:hackathonId/search: Filter participants by experience level, technology stack, and business unit where experience_level, technology_stack, business_unit passed as query params
