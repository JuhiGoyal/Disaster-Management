# System Architecture & Tech Stack

## 1. Technology Stack

### Frontend (Client-Side)
- **Framework:** React.js (v18)
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API (`AuthContext`)
- **HTTP Client:** Axios (Interceptors configured for JWT injection)
- **Styling:** Vanilla CSS3 with modern variables, Flexbox, and CSS Grid
- **Deployment:** Netlify

### Backend (Server-Side)
- **Environment:** Node.js
- **Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Uploads:** Multer
- **Email Delivery:** Nodemailer (SMTP)
- **Deployment:** Render (Web Service)

### Database (Data Layer)
- **Database:** MongoDB
- **Hosting:** MongoDB Atlas Cloud
- **ODM:** Mongoose

---

## 2. System Architecture Diagram

```mermaid
flowchart TD
    subgraph Client [Client Tier - Browser]
        UI[React.js Frontend UI]
        Router[React Router]
        State[AuthContext]
        Axios[Axios HTTP Client]
    end

    subgraph CDN [Netlify Edge]
        Static[Static Assets & Build]
    end

    subgraph Server [Application Tier - Render]
        Express[Express.js App]
        AuthMW[Auth Middleware JWT]
        Routers[Express Routers]
        Controllers[Business Logic Controllers]
        Notification[Nodemailer Service]
    end

    subgraph Data [Data Tier - MongoDB Atlas]
        UsersDB[(Users)]
        DisastersDB[(Disasters)]
        ContributionsDB[(Contributions)]
        TeamsDB[(Rescue Teams)]
    end

    subgraph External [External Services]
        Gmail[Gmail SMTP Server]
    end

    %% Connections
    UI <--> Router
    UI <--> State
    State <--> Axios
    
    UI --> |Requests HTML/JS/CSS| Static
    Static --> |Serves Frontend| UI
    
    Axios --> |REST API Calls HTTP/JSON| Express
    
    Express --> AuthMW
    AuthMW --> Routers
    Routers --> Controllers
    
    Controllers <--> UsersDB
    Controllers <--> DisastersDB
    Controllers <--> ContributionsDB
    Controllers <--> TeamsDB
    
    Controllers --> Notification
    Notification --> |SMTP| Gmail
    Gmail --> |Sends Receipts/Alerts| UsersOut[Users / Rescue Teams]
```

---

## 3. Database Schema Entity Relationship (ERD)

```mermaid
erDiagram
    USER ||--o{ CONTRIBUTION : makes
    USER ||--o{ DISASTER : reports
    DISASTER ||--o{ CONTRIBUTION : receives
    DISASTER ||--o{ RESCUE_TEAM : assigned_to

    USER {
        ObjectId _id PK
        String name
        String email
        String password
        String role "admin/user"
        Array address
    }

    DISASTER {
        ObjectId _id PK
        String title
        String type
        String severity
        Object location
        String status
        Number casualties
        Array files
    }

    CONTRIBUTION {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId disasterId FK
        String contributionType "funds/food/medical"
        Number amount
    }

    RESCUE_TEAM {
        ObjectId _id PK
        String name
        String specialization
        String contactEmail
        String availability
        ObjectId assignedDisaster FK
    }
```

---

## 4. Deployment Architecture

```mermaid
flowchart LR
    Dev[Developer] --> |git push| GitHub[GitHub Repo]
    
    GitHub --> |WebHook| Render[Render.com]
    GitHub --> |WebHook| Netlify[Netlify]
    
    subgraph Serverless
        Netlify --> |npm run build| Frontend[Live Frontend URL]
    end
    
    subgraph Cloud Container
        Render --> |npm start| Backend[Live Backend API]
    end
    
    Frontend --> |HTTPS API Requests| Backend
    Backend --> |TCP/IP| Mongo[MongoDB Atlas Cluster]
```
