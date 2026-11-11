# Data Flows & Interaction Sequences
**Classification:** Technical Architecture Specification  

---

## 1. Lead Generation Sequence
```
[User Browser]           [Web Router]          [Validation]          [DB Layer]           [Admin Notice]
      |                        |                     |                     |                     |
      |-- POST /api/leads ---->|                     |                     |                     |
      |                        |-- validatePayload ->|                     |                     |
      |                        |                     |-- (valid) --------->|                     |
      |                        |                     |                     |-- INSERT INTO leads |
      |                        |                     |                     |   (status: 'new')   |
      |                        |<------------------------------------------|                     |
      |                        |-- triggerNotification (async) --------------------------------->|
      |<-- 201 Created --------|                                                                 |
      |    {success: true}     |                                                                 |
```

---

## 2. Authentication & Admin Authorization Flow
```
[Admin Browser]          [Auth Guard]          [PBKDF2 Verifier]     [Session Store]      [Admin Controller]
      |                        |                     |                     |                     |
      |-- POST /api/login ---->|                     |                     |                     |
      |                        |-- verifyCredentials>|                     |                     |
      |                        |                     |-- compareSaltHash ->|                     |
      |                        |<--------------------+                     |                     |
      |                        |-- createSession ------------------------->|                     |
      |<-- Set-Cookie ---------|                                           |                     |
      |    (HttpOnly, Secure)  |                                           |                     |
      |                        |                                           |                     |
      |-- GET /admin/leads --->|                                           |                     |
      |    (Cookie: sid)       |-- validateSession ->                      |                     |
      |                        |<-- user (role: admin) --------------------|                     |
      |                        |-- authorize(role == 'admin')                                    |
      |                        |---------------------------------------------------------------->|
      |<-- 200 OK (Leads List)-|                                                                 |
```
