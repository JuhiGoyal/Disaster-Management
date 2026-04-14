# ResQNet - Detailed Wireframe

This document outlines the user interface structure, component breakdown, and data flow for each page in the application.

## 1. Landing Page (`/`)
*   **Purpose:** Initial landing page for all visitors.
*   **Components:**
    *   **Hero Section:** High-impact call to action ("Be a Hero, Save Lives").
    *   **Features Grid:** Highlights of what the platform does (Reporting, Contributing, Rescue).
    *   **Live Stats:** Counter showing active disasters and successful rescues. (Data: `GET /api/disaster?status=active`)
    *   **Auth Buttons:** "Sign In" and "Join Now".
*   **Actions:** Navigates to `/login` or `/dashboard`.

## 2. Login Page (`/login`)
*   **Purpose:** Secure entry point for Registered Users and Admins.
*   **Components:**
    *   **Credentials Form:** Email and Password inputs.
    *   **Toggle:** Option to switch between "Citizen" and "Admin" views (internal).
*   **Data Flow:** POSTs to `/api/user/login`. Store JWT and role in LocalStorage/Auth Context.
*   **Navigation:** Redirects to `/dashboard` upon success.

## 3. Unified Dashboard (`/dashboard`)
*   **Purpose:** Personalized overview of the disaster landscape.
*   **Components:**
    *   **Statistics Header:** Total Reports, Active Teams, Total Funds Raised.
    *   **Quick Actions:** 
        *   "Report Disaster" $\rightarrow$ `/disaster/report`
        *   "View Disasters" $\rightarrow$ `/disasters`
    *   **Nearby Disasters (List):** Auto-filters based on user's registered city. (Data: `GET /api/disaster?city=UserCity`)
*   **Data Flow:** Fetches combined stats from `/api/disaster` and `/api/user/profile`.

## 4. Disaster List View (`/disasters`)
*   **Purpose:** Browseable directory of incidents.
*   **Components:**
    *   **Filter Sidebar:** Filter by Type (Flood, Fire, etc.), Severity (Low-High), and Status.
    *   **Disaster Cards:** Title, Damage Estimate, Photo, "Contribute" button.
*   **Data Flow:** Paginated results from `GET /api/disaster`.

## 5. Reporting Page (`/disaster/report`)
*   **Purpose:** Front-line reporting for citizens.
*   **Components:**
    *   **Multi-step Form:**
        1. **Details:** Title, Description, Disaster Type.
        2. **Location:** Auto-detect coordinates or manual address entry.
        3. **Impact:** Casualties estimate, Needs (Food/Water).
        4. **Media:** Image upload (Handled by Multer).
*   **Data Flow:** POST to `FormData` to `/api/disaster/addDisaster`.

## 6. Contribution Flow (`/contribute`)
*   **Purpose:** Enable resource donation.
*   **Components:**
    *   **Target Selection:** Dropdown of active disasters.
    *   **Type Selector:** Toggle between Financial and Material.
    *   **Details Area:** Amount (for Financial) or List of items/Quantity (for Material).
*   **Data Flow:** POST to `/api/contribution`.

## 7. Admin: Rescue Team Ops (`/admin/rescue-teams`)
*   **Purpose:** Operational control for officials.
*   **Components:**
    *   **Team Status Board:** Matrix showing specialized units (available/deployed).
    *   **Assignment Drag & Drop:** Move teams into disaster "slots".
*   **Data Flow:** 
    *   Fetch teams: `GET /api/rescue-team`
    *   Update Assignment: `POST /api/rescue-team/assign`

---
*Created by Antigravity Senior Product Engineer.*
