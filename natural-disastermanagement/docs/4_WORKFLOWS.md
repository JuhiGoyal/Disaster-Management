# System Workflows & Event Processing

This document details the step-by-step lifecycles of major events within the **ResQNet** platform.

---

## 1. User Registration & Authentication Workflow

```mermaid
sequenceDiagram
    participant User as React Frontend (User)
    participant Auth as Express Backend (userController)
    participant DB as MongoDB Atlas
    participant Email as Nodemailer Service
    
    User->>Auth: POST /api/user/register {name, email, password}
    Auth->>DB: Check if email exists
    DB-->>Auth: false
    Auth->>Auth: bcrypt.hash(password)
    Auth->>DB: User.create()
    DB-->>Auth: User Document
    Auth->>Auth: jwt.sign(userId)
    Auth-->>User: 201 Created + JWT Token
    User->>User: localStorage.setItem('token')
    
    %% Async task
    Note over Auth, Email: Non-blocking background task
    Auth->>Email: sendEmail(user.email, "Welcome Template")
    Email-->>Auth: Log Success/Failure
```

---

## 2. Disaster Reporting Workflow

```mermaid
sequenceDiagram
    participant Civilian
    participant API as Backend (disasterController)
    participant Storage as Multer (FileSystem)
    participant DB as MongoDB
    
    Civilian->>API: POST /api/disaster (Multipart Form Data)
    Note over Civilian, API: Includes Header: Bearer <token>
    
    API->>API: verifyToken Middleware
    
    API->>Storage: Store Array of Files (multer)
    Storage-->>API: File Paths & Metadata
    
    API->>DB: Disaster.create(data + files)
    DB-->>API: Disaster ObjectId
    
    API-->>Civilian: 201 Success (Disaster Logged)
    
    %% Async Notification
    API->>DB: Fetch User Email from Token ID
    DB-->>API: user@email.com
    API->>Email: sendEmail("Report Received Confirmation")
```

---

## 3. Rescue Team Assignment Workflow

```mermaid
sequenceDiagram
    participant Admin
    participant Server as Backend (rescueTeamController)
    participant DB as MongoDB
    participant Email as Nodemailer (SMTP)
    participant Team as NGO/Rescue Team Inbox
    
    Admin->>Server: POST /api/rescue-team/assign {teamId, disasterId}
    Note over Admin, Server: Requires Admin JWT
    
    Server->>DB: Find Rescue Team by ID
    DB-->>Server: Team Data (Status: Available)
    
    Server->>DB: Find Disaster by ID
    DB-->>Server: Disaster Data
    
    Server->>DB: Update Team.assignedDisaster = disasterId
    Server->>DB: Update Team.availability = 'busy'
    DB-->>Server: Updates Confirmed
    
    Server-->>Admin: 200 OK (Team Deployed)
    
    %% Critical Alert Delivery
    Server->>Email: sendEmail(Team.contactEmail, "⚠️ DEPLOYMENT ALERT", Location Data)
    Email->>Team: Delivers Urgent HTML Email
```

---

## 4. UI / Wireframe Flow Navigation

1. **Landing Page (`/`)**
   - Introduces ResQNet.
   - Public metrics (Active Disasters, Total Rescue Teams).
   - *Call to Actions*: Login, Register Rescue Team.

2. **Dashboard (`/dashboard`)**
   - Protected Route.
   - Summarizes user activity (Reports made, Contributions given).
   - Admin view includes global system controls instead of user summary.

3. **Disaster Hub (`/disasters`)**
   - Grid layout of all active incidents.
   - Filters for 'Type' and 'Severity'.
   - 'Contribute' button opens modal/page.

4. **Rescue Team Portal (`/admin/rescue-teams`)**
   - *Admin Only.*
   - Table view of all NGOs.
   - 'Assign' action opens modal linking to active disaster IDs.
