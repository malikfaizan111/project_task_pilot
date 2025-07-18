import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useProjects } from "@/context/ProjectContext";
import { TaskForm } from "./TaskForm";
import { Project } from "@/types/project";

type TaskAddProps = {
    projectId: number;
}
export const TaskAdd: React.FC<TaskAddProps> = ({ projectId }) => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { projects } = useProjects();
    const project: Project = projects.find(p => p.id === projectId);

    return (
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
                <Link to="/projects">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                </Link>
            </Button>

            <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">{project?.name} - Tasks</h1>
                <p className="text-muted-foreground">{project?.description}</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Task
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                    </DialogHeader>
                    <TaskForm
                        projectId={projectId}
                        onSuccess={() => setIsCreateDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}