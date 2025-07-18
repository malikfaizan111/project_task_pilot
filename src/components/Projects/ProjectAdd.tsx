import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-react";
import { ProjectForm } from "./ProjectForm";


export const ProjectAdd: React.FC = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
                <p className="text-muted-foreground">Manage your projects and track progress</p>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger>
                    <Button asChild className="flex items-center gap-2">
                        <span>
                            <Plus className="h-4 w-4" />
                            Add Project
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                    </DialogHeader>
                    <ProjectForm onSuccess={() => setIsCreateDialogOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
