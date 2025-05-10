# CareNest Daycare

## Project Description

CareNest is a full-stack Daycare Management System that helps daycares manage their work easily. It supports two types of users: **Parent** and **Supervisor**.

* **Parents** can:

  * Track their own children attendance.
  * View their own children achievements.
  * Access their own children details.

* **Supervisors** can:

  * Add children and assign them to their parents accounts.
  * Track and manage all children.
  * Record daily attendance
  * Upload badges, personal images, and artwork

The system is built to make daycare management easier, more organized, and help everyone stay connected.

## Frontend Tech Stack

**Languages:**

* JavaScript
* HTML & CSS

**Frameworks & Libraries:**

* React.js
* React Router
* Axios

**Styling:**

* Custom CSS
* Google Fonts (Fredoka)

**Build Tools:**

* Vite

**Development Tools:**

* Git & GitHub
* VS Code

## Backend Repository Link

[CareNest Backend Repo](https://github.com/ghd1010/care-nest-backend)

## Getting Started / Code Installation

To set up the project locally, follow these steps:

### 1. Clone the Repository:

* **Frontend:** `git clone https://github.com/ghd1010/care-nest-frontend.git`

### 2. Frontend Setup:

```bash
cd care-nest-frontend-project
npm install
npm run dev
```


## App Screenshots
### Main Interfaces
#### Main Page
![main-page](assets/main-page.png)
#### Signup Page
![signup](assets/signup.png)
#### Login Page
![login](assets/login.png)
### Supervisor Interfaces
#### Home Page
![home-page](assets/welcome-supervisor.png)
#### View CareNest Children Page
![viewch](assets/view-all-children.png)
#### Child Detail Page
![chdeta](assets/child-detail.png)
### Add Child Page
![addchil](assets/add-child.png)
### Edit Child Page
![editchil](assets/edit-child.png)
#### View Sections Page
![viewsec](assets/view-sections.png)
### View Section Attendance Page
![viewsecatt](assets/view-section-attendance.png)
### Add Attendance Page
![addattendance](assets/add-attendance.png)
#### Edit Attendance Page
![editattend](assets/edit-attendance.png)
### Selectin Section Attendance Page
![choosesection](assets/choose-section.png)
### Achievements Page
![achievemetspage](assets/achievements.png)
### Add Achievements Page
![addachievemetspage](assets/add-achievement.png)
### View Achievements Page
![viewachievemetspage](assets/view-achievements.png)
### Edit Achievements Page
![editachievemetspage](assets/edit-achievement.png)
### Parent Interfaces
#### Home Page
![home-pagparent](assets/welcome-parent.png)
#### My Children Page
![mychildren](assets/mychildren-parent.png)
#### My Child Details Page
![mychildrendetails](assets/mychild-details.png)
### View Attendance Page
![attendancceparent](assets/attendance-parent.png)
### iew Achievements Page
![achievementparent](assets/achievements-parent.png)
## Frontend Routing Table
| **Route Name**                | **URL**                         | **HTTP Verb** | **Description**                              |
| ----------------------------- | ------------------------------- | ------------- | -------------------------------------------- |
| MainPage                    | /                             | GET           | Landing page (welcome + logo)                |
| HomePage                    | /home                         | GET           | Main dashboard/homepage after login          |
| Logout                      | /logout                       | GET           | Logs out the current user                    |
| AddChild                    | /add                          | POST           | Form to add a new child (supervisor only)    |
| ChildrenList                | /children                     | GET           | List of all children (supervisor only)       |
| ChildDetails                | /children/:id                 | GET           | Detailed view of a specific child            |
| EditChild                   | /children/:id/edit            | PATCH           | Edit form for a specific child               |
| AddAchievement              | /achievements/add             | POST           | Form to add a new achievement                |
| ChildAchievementList        | /children/:id/achievements/   | GET           | List of achievements for a specific child    |
| EditAchievement             | /achievements/:id/edit        | PATCH           | Edit a specific achievement                  |
| AllChildrenAchievementsList | /children-achievements/       | GET           | List of all achievements across all children |
| MyChildren                  | /my-children                  | GET           | View children linked to the logged-in parent |
| MyChildAttendance           | /children/:id/attendance      | GET           | View attendance of a specific child          |
| SectionsList                | /sections                     | GET           | List all sections                            |
| ViewSectionAttendance       | /sections/:id/attendance      | GET           | View attendance for a specific section       |
| ChildrenInSectionList       | /sections/:id/children/       | GET           | View children in a specific section          |
| AddAttendance               | /sections/:id/attendance/add/ | POST           | Add attendance record for a section          |
| EditAttendance              | /attendance/:id/edit/         | PATCH           | Edit a specific attendance record            |
| AttendanceDropDown          | /attendance                   | GET           | Choose section to view attendance            |
| Signup                      | /signup                       | POST           | User registration page                       |
| Login                       | /login                        | GET           | User login page                              |
| NotFound                    | *                             | GET           | Fallback for undefined routes (404 page)     |

## IceBox Features

1. Implementing a customized user type
2. Add staff (employees that the supervisor can track)
3. Add the `Post` model for communication between daycare and parents
4. Add the OTP code "Exit Code"
5. Add subscriptions and offers
6. Add food preferences for each child
7. Better UI/UX
8. Profile page for users
9. Parents should not Signup, because in real world, parent went first to the daycare, register their data there, and give them their acccounts. but I created the Sign up because its required to have a Sign up page.
10. Add a summary content in the home component for each user.
