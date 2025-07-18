export interface Project {
  id: number;
  name: string;
  owner: string;
  status: "Active" | "Completed" | "On Hold";
  description: string;
  tasks: number[];
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  assignee: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
}

export interface ProjectWithTasks extends Project {
  taskDetails: Task[];
  progress: number;
  taskCount: number;
}
