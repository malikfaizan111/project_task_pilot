import { useProjects } from "@/context/ProjectContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { Task } from "@/types/project";
import { title } from "process";

type TaskDashboardProps = {
    projectId: number;
};

export const TaskDashboard: React.FC<TaskDashboardProps> = ({ projectId }) => {

    const { projects, getTasksByProjectId } = useProjects();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const projectTasks = getTasksByProjectId(projectId);
        setTasks(projectTasks);
    }, [projectId, getTasksByProjectId, projects]);

    const taskStats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        pending: tasks.filter(t => t.status === 'Pending').length,
    };

    const cardData = [
        {
            title: "Total Tasks",
            value: taskStats.total,
            colorClass: "text-primary",
        },
        {
            title: "Completed",
            value: taskStats.completed,
            colorClass: "text-success",
        },
        {
            title: "In Progress",
            value: taskStats.inProgress,
            colorClass: "text-primary",
        },
        {
            title: "Pending",
            value: taskStats.pending,
            colorClass: "text-muted-foreground",
        },
    ];


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, index) => (
            <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-primary">{card.value}</div>
                </CardContent>
            </Card>
        ))}
        </div>

    );
}