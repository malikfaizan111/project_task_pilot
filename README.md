# Project & Task Management Dashboard

A modern, responsive project and task management dashboard built with React, TypeScript, and shadcn/ui components.

## Features

### Features

- Project dashboard with Tailwind and progress bars
- Project CRUD (add, edit, delete) with dialogs and validation
- Filter and search projects by status, owner, or name
- Expandable project rows for summaries/next tasks
- Task management per project: view, add, edit, delete tasks
- Inline editing for task status and due date
- Add/edit tasks using dialogs with validation
- Responsive and accessible UI with Tailwind and Lucide
- Notifications via toast/messages



## Project Structure

```
.
├── src
│   ├── components
│   │   ├── Projects
│   │   │   ├── ProjectAdd.tsx
│   │   │   ├── ProjectDashboard.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   └── ProjectListing.tsx
│   │   ├── Tasks
│   │   │   ├── TaskAdd.tsx
│   │   │   ├── TaskDashboard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskListing.tsx
│   │   └── ui
│   ├── context
│   │   ├── ProjectContext.tsx
│   │   └── ProjectContextType.ts
│   ├── data
│   │   └── mockData.ts
│   └── lib
│       └── utils.ts
│
├── hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── pages
│   ├── index.tsx
│   ├── NotFound.tsx
│   ├── Projects.tsx
│   └── Tasks.tsx
│
├── services
│   └── projectService.ts
│
├── types
│   └── project.ts
│
├── App.tsx
├── main.tsx
├── index.html
├── index.css
└── App.css

```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. ## Clone the repository:
```bash
git clone <repository-url>
cd project_task_pilot
```

2. ## Install dependencies:
```bash
npm install
```


4. ## Open your browser and navigate to `http://localhost:8080/`


## Usage

### Navigation
- **Home Page** (`/`): Landing page with feature overview
- **Projects** (`/projects`): Main project dashboard
- **Tasks** (`/projects/:id/tasks`): Task management for specific project

### Managing Projects
1. Click "Add Project" to create a new project
2. Use the search bar to find specific projects
3. Filter projects by status using the dropdown
4. Click "View Tasks" to manage project tasks
5. Use the Edit button to modify project details

### Managing Tasks
1. Navigate to a project's task view
2. Click "Add Task" to create new tasks
3. Use filters to find specific tasks




### Landing Page
![Landing Page](/public/main-page.png)

### Project Listing Page
![Projects Page](/public/project-page.png)

### Task Page
![Tasks Page](/public/task-page.png)