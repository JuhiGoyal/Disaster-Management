# Software Requirements Specification (SRS)

## 1. Scope
This document outlines the functional and non-functional requirements for the **ResQNet** platform. It defines how the system behaves, the roles involved, and the performance standards it must meet.

## 2. User Roles
1.  **Civilian (User):** Can report disasters, make contributions, and view active incidents.
2.  **Administrator (Admin):** Can manage disasters, assign rescue teams, view total contributions, and manage users.
3.  **Rescue Team (NGO/Agency):** Registers their capabilities and receives assignments to active disaster zones.

## 3. Functional Requirements

### 3.1 User Management & Authentication
- **FR1.1:** The system shall allow users to register using Name, Email, and Password.
- **FR1.2:** The system shall hash passwords using bcrypt before saving to the database.
- **FR1.3:** The system shall generate a JSON Web Token (JWT) upon successful login for session management.
- **FR1.4:** The system shall send an automated Welcome Email upon successful registration.

### 3.2 Disaster Reporting System
- **FR2.1:** Authenticated users shall be able to submit a disaster report including Title, Type, Severity, Location (City, State, Country), and Description.
- **FR2.2:** The system shall support image/document attachments (up to 5 files) via Multer.
- **FR2.3:** The system shall send an email receipt to the user confirming the report.
- **FR2.4:** The system shall display active disasters on a public dashboard.

### 3.3 Contribution & Relief Management
- **FR3.1:** Users shall be able to log contributions (Funds, Food, Medical, Shelter) linked to a specific disaster ID.
- **FR3.2:** The system shall update the disaster's total contribution ledger dynamically.
- **FR3.3:** The system shall send a detailed Donation Receipt email to the contributor.

### 3.4 Rescue Team Operations
- **FR4.1:** Rescue teams shall be able to register their details publicly without needing admin authentication.
- **FR4.2:** Admins shall have the ability to view all registered rescue teams.
- **FR4.3:** Admins shall be able to assign a rescue team to an active disaster.
- **FR4.4:** The system shall send an urgent ⚠️ Deployment Alert email to the Rescue Team's contact email upon assignment.

### 3.5 Automated Chat System (ResQBot)
- **FR5.1:** The platform shall provide a persistent floating chatbot on all frontend routes.
- **FR5.2:** The chatbot shall respond to keywords (help, report, contribute) with actionable links to assist users in distress.

## 4. Non-Functional Requirements (NFR)

### 4.1 Performance & Scalability
- **NFR1.1:** The backend API shall respond to 95% of requests within 200 milliseconds.
- **NFR1.2:** The system architecture must allow the frontend and backend to scale independently (Monorepo with separate build processes).

### 4.2 Security
- **NFR2.1:** All API endpoints altering data shall require JWT Authorization via Bearer tokens.
- **NFR2.2:** Environment variables (DB URI, Secrets, Email Passwords) must never be exposed to the client bundle.
- **NFR2.3:** Cross-Origin Resource Sharing (CORS) shall be restricted to whitelisted domains (Localhost, Netlify).

### 4.3 Usability
- **NFR3.1:** The user interface shall be fully responsive, supporting mobile, tablet, and desktop views natively.
- **NFR3.2:** The UI shall utilize color psychology (Red for critical, Orange for warnings, Blue for information) to guide panicked users effectively.

### 4.4 Reliability & Availability
- **NFR4.1:** The database must utilize MongoDB Atlas for 99.99% uptime and automatic backups.
- **NFR4.2:** The system shall handle email service failures gracefully without crashing the main application flow.
