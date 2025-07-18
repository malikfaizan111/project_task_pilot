import { Project, Task, ProjectWithTasks } from '@/types/project';

export interface ProjectContextType {
  projects: ProjectWithTasks[];
  tasks: Task[];
  refreshProjects: () => void;
  refreshTasks: () => void;
  createProject: (project: Omit<Project, 'id'>) => Promise<Project>;
  updateProject: (id: number, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  createTask: (task: Omit<Task, 'id'>) => Promise<Task>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  getTasksByProjectId: (projectId: number) => Task[];
}