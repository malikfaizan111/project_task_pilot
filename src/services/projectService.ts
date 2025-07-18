import { Project, Task, ProjectWithTasks } from '@/types/project';
import { mockProjects, mockTasks } from '@/data/mockData';

class ProjectService {
  private projects: Project[] = [...mockProjects];
  private tasks: Task[] = [...mockTasks];

  // Projects
  getProjects(): Project[] {
    return this.projects;
  }

  getProjectsWithDetails(): ProjectWithTasks[] {
    return this.projects.map(project => {
      const taskDetails = this.tasks.filter(task => task.projectId === project.id);
      const completedTasks = taskDetails.filter(task => task.status === 'Completed').length;
      const progress = taskDetails.length > 0 ? (completedTasks / taskDetails.length) * 100 : 0;
      
      return {
        ...project,
        taskDetails,
        progress: Math.round(progress),
        taskCount: taskDetails.length
      };
    });
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  createProject(project: Omit<Project, 'id'>): Project {
    const newProject = {
      ...project,
      id: Math.max(...this.projects.map(p => p.id)) + 1
    };
    this.projects.push(newProject);
    return newProject;
  }

  updateProject(id: number, updates: Partial<Project>): Project | null {
    const index = this.projects.findIndex(project => project.id === id);
    if (index === -1) return null;
    
    this.projects[index] = { ...this.projects[index], ...updates };
    return this.projects[index];
  }

  deleteProject(id: number): boolean {
    const index = this.projects.findIndex(project => project.id === id);
    if (index === -1) return false;
    
    this.projects.splice(index, 1);
    // Also remove all tasks for this project
    this.tasks = this.tasks.filter(task => task.projectId !== id);
    return true;
  }

  // Tasks
  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksByProjectId(projectId: number): Task[] {
    return this.tasks.filter(task => task.projectId === projectId);
  }

  createTask(task: Omit<Task, 'id'>): Task {
    const newTask = {
      ...task,
      id: Math.max(...this.tasks.map(t => t.id)) + 1
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return null;
    
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    
    this.tasks.splice(index, 1);
    return true;
  }
}

export const projectService = new ProjectService();