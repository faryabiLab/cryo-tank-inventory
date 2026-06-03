# Cryo Tank Inventory

A laboratory inventory management app made at Upenn (Faryabi Lab) for tracking liquid nitrogen storage — boxes, vials, and cell lines — for individual lab members.

<img width="1462" height="960" alt="inventory page" src="https://github.com/user-attachments/assets/65d33717-8969-4900-881d-5ebdac5fab70" />

## Overview

Cryo Tank Inventory lets lab members organize their cryogenic storage digitally. Each user manages their own boxes and vials, while cell lines are shared among all users for vial creation.

🔗 **Live app:** https://faryabilab.github.io/cryo-tank-inventory/

## Features

### Authentication
- Secure sign-up, login, and logout via AWS Cognito
- Email verification with confirmation codes
- Forgot password / password reset flow
- Protected routes — unauthenticated users are redirected to login

### Boxes
- Create, edit, archive, and delete storage boxes
- Mark boxes as `Main Tank` or `Essential Storage`
- Inline name editing

https://github.com/user-attachments/assets/2c937a09-af77-4564-94b1-0a4477578de3

### Vials
- Add vials to specific positions within a box
- Position conflict prevention (no two vials in the same slot)
- Optional vial naming
- Each vial derives its color from its cell line
- Cascade deletion — deleting a box removes its vials

https://github.com/user-attachments/assets/3cd9873f-73ed-4222-af12-5bb814e3954a

### Cell Lines
- Shared across all users as reference data
- Categorization with species, growth, disease, and tissue tags

<img width="1320" height="1014" alt="Classification page" src="https://github.com/user-attachments/assets/a380c336-d461-4f2b-9e4e-9a27d169162e" />

### Paint Mode (quick vial creation)
- Toggle in edit mode to rapidly fill slots
- Select a cell line, then click empty slots to instantly place vials

https://github.com/user-attachments/assets/15651b3f-46d6-4d02-8c3f-af7742b49332

### Responsive Design
- Adapts to desktop, tablet, and mobile layouts

https://github.com/user-attachments/assets/5e6a5e04-84d1-4db6-b3db-69b0018d15ae

## Tech Stack

**Frontend**
- React + React Router (SPA mode)
- TypeScript
- Tailwind CSS
- Vite
- AWS Amplify (Cognito integration)

**Backend**
- Node.js + Express
- TypeScript
- Prisma ORM
- Swagger / OpenAPI for API documentation

**Infrastructure**
- PostgreSQL on AWS RDS
- Backend hosted on AWS EC2 (nginx reverse proxy)
- Frontend hosted on GitHub Pages (GitHub Actions CI/CD)
- AWS Cognito for authentication
