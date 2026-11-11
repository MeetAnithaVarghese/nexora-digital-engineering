# System Architecture Overview: Nexora Digital Engineering
**Classification:** Technical Architecture Baseline  
**Topology:** C4 Architecture Model (Context, Container, Component, Code)  

---

## 1. System Context (Level 1)
Nexora Digital Engineering provides a unified digital web experience for prospective enterprise clients, search engines, answer engines, and internal administrators.

```
+-------------------------------------------------------------------------+
|                              USERS & SYSTEMS                            |
|                                                                         |
|  [Enterprise Prospect]       [Search & AI Crawlers]        [Staff Admin] |
+-------------+--------------------------+------------------------+-------+
              |                          |                        |
              | HTTPS (Port 443/3000)    | Robots/Sitemap/JSON-LD | HTTPS (Admin Session)
              v                          v                        v
+-------------------------------------------------------------------------+
|                  NEXORA DIGITAL WEB PLATFORM (SYSTEM)                  |
|                                                                         |
|  - Public Service Catalog & Tech Insights                              |
|  - Interactive Lead Generation & Validation                             |
|  - Multi-Entity Search Engine                                           |
|  - Authenticated Admin & CMS Control Panel                              |
+------------------------------------+------------------------------------+
                                     |
                                     v
                        +--------------------------+
                        |  Local SQLite Datastore  |
                        |       (nexora.db)        |
                        +--------------------------+
```

---

## 2. Container Topology (Level 2)
The application runs as a modular single-process Node.js runtime:

```
+------------------------------------------------------------------------------------+
| Node.js Runtime Container                                                          |
|                                                                                    |
|  +--------------------+   +-----------------------+   +-------------------------+  |
|  | HTTP Web Server    |   | REST API Router       |   | Authentication Guard    |  |
|  | (Static & SSR)     |-->| (Lead, Search, CMS)   |-->| (Session & PBKDF2 RBAC) |  |
|  +--------------------+   +-----------------------+   +-------------------------+  |
|                                       |                                            |
|                                       v                                            |
|                           +-----------------------+                                |
|                           | Data Access Layer     |                                |
|                           | (Parameterized SQL)   |                                |
|                           +-----------------------+                                |
|                                       |                                            |
+---------------------------------------|--------------------------------------------+
                                        v
                          +---------------------------+
                          | Embedded SQLite Database  |
                          | (WAL Mode, Foreign Keys)  |
                          +---------------------------+
```

---

## 3. Database Schema Overview (Level 3 - Entity Relationship)
- **`users`**: `id`, `email`, `password_hash`, `salt`, `role`, `created_at`
- **`services`**: `id`, `slug`, `title`, `tagline`, `summary`, `features_json`, `capabilities_json`, `icon`, `created_at`
- **`articles`**: `id`, `slug`, `title`, `category`, `summary`, `body_markdown`, `author`, `status`, `view_count`, `published_at`
- **`leads`**: `id`, `full_name`, `email`, `company`, `service_interest`, `message`, `status`, `created_at`
- **`audit_logs`**: `id`, `user_id`, `action`, `entity_type`, `entity_id`, `details`, `created_at`

