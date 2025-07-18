import { Project, Task } from '@/types/project';

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    owner: "Alice",
    status: "Active",
    description: "Revamp company website for Q3",
    tasks: [101, 102]
  },
  {
    id: 2,
    name: "Mobile App Launch",
    owner: "Bob",
    status: "Completed",
    description: "Launch Android and iOS versions",
    tasks: [103, 104, 105]
  },
  {
    id: 3,
    name: "Marketing Campaign",
    owner: "Carol",
    status: "Active",
    description: "Q4 holiday marketing push",
    tasks: [106, 107, 108, 109]
  },
  {
    id: 4,
    name: "Backend Migration",
    owner: "David",
    status: "On Hold",
    description: "Migrate legacy systems to cloud",
    tasks: [110]
  }
];

export const mockTasks: Task[] = [
  {
    id: 101,
    projectId: 1,
    title: "Wireframe new homepage",
    assignee: "Emma",
    dueDate: "2025-07-10",
    status: "In Progress",
    priority: "High"
  },
  {
    id: 102,
    projectId: 1,
    title: "Get stakeholder approval",
    assignee: "Liam",
    dueDate: "2025-07-12",
    status: "Pending",
    priority: "Medium"
  },
  {
    id: 103,
    projectId: 2,
    title: "Beta test with internal team",
    assignee: "Olivia",
    dueDate: "2025-06-28",
    status: "Completed",
    priority: "High"
  },
  {
    id: 104,
    projectId: 2,
    title: "Fix reported bugs",
    assignee: "Noah",
    dueDate: "2025-06-29",
    status: "Completed",
    priority: "High"
  },
  {
    id: 105,
    projectId: 2,
    title: "Submit to app stores",
    assignee: "Ava",
    dueDate: "2025-07-01",
    status: "Completed",
    priority: "Medium"
  },
  {
    id: 106,
    projectId: 3,
    title: "Design holiday banners",
    assignee: "Sophie",
    dueDate: "2025-07-15",
    status: "In Progress",
    priority: "High"
  },
  {
    id: 107,
    projectId: 3,
    title: "Create email templates",
    assignee: "James",
    dueDate: "2025-07-20",
    status: "Pending",
    priority: "Medium"
  },
  {
    id: 108,
    projectId: 3,
    title: "Setup analytics tracking",
    assignee: "Maya",
    dueDate: "2025-07-18",
    status: "Pending",
    priority: "Low"
  },
  {
    id: 109,
    projectId: 3,
    title: "Launch social media campaign",
    assignee: "Alex",
    dueDate: "2025-07-25",
    status: "Pending",
    priority: "High"
  },
  {
    id: 110,
    projectId: 4,
    title: "Audit existing infrastructure",
    assignee: "Ryan",
    dueDate: "2025-08-01",
    status: "Pending",
    priority: "Medium"
  }
];