import React, { createContext, useContext, useState, useCallback } from 'react';
import { Project, Task, ProjectWithTasks } from '@/types/project';
import { projectService } from '@/services/projectService';
import { ProjectContextType } from './ProjectContextType';



const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectWithTasks[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const refreshProjects = useCallback(() => {
    const projectsWithDetails = projectService.getProjectsWithDetails();
    setProjects(projectsWithDetails);
  }, []);

  const refreshTasks = useCallback(() => {
    const allTasks = projectService.getTasks();
    setTasks(allTasks);
  }, []);

  const createProject = useCallback(async (project: Omit<Project, 'id'>) => {
    const newProject = projectService.createProject(project);
    refreshProjects();
    return newProject;
  }, [refreshProjects]);

  const updateProject = useCallback(async (id: number, updates: Partial<Project>) => {
    projectService.updateProject(id, updates);
    refreshProjects();
  }, [refreshProjects]);

  const deleteProject = useCallback(async (id: number) => {
    projectService.deleteProject(id);
    refreshProjects();
    refreshTasks();
  }, [refreshProjects, refreshTasks]);

  const createTask = useCallback(async (task: Omit<Task, 'id'>) => {
    const newTask = projectService.createTask(task);
    refreshTasks();
    refreshProjects(); // Refresh to update progress
    return newTask;
  }, [refreshTasks, refreshProjects]);

  const updateTask = useCallback(async (id: number, updates: Partial<Task>) => {
    projectService.updateTask(id, updates);
    refreshTasks();
    refreshProjects(); // Refresh to update progress
  }, [refreshTasks, refreshProjects]);

  const deleteTask = useCallback(async (id: number) => {
    projectService.deleteTask(id);
    refreshTasks();
    refreshProjects(); // Refresh to update progress
  }, [refreshTasks, refreshProjects]);

  const getTasksByProjectId = useCallback((projectId: number) => {
    return projectService.getTasksByProjectId(projectId);
  }, []);

  // Initialize data
  React.useEffect(() => {
    refreshProjects();
    refreshTasks();
  }, [refreshProjects, refreshTasks]);

    const value: ProjectContextType = React.useMemo(() => ({
        projects,
        tasks,
        refreshProjects,
        refreshTasks,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
        getTasksByProjectId,
    }), [
        projects,
        tasks,
        refreshProjects,
        refreshTasks,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
        getTasksByProjectId,
    ]);

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
}