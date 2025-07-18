import { useProjects } from "@/context/ProjectContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const ProjectDashboard: React.FC = () => {
    const { projects } = useProjects();

    const analytics = {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'Active').length,
        completedProjects: projects.filter(p => p.status === 'Completed').length,
        totalTasks: projects.reduce((sum, project) => sum + project.taskCount, 0)
    };

    const cardData = [
        {
            title: "Total Projects",
            value: analytics.totalProjects,
            colorClass: "text-primary",
        },
        {
            title: "Active Projects",
            value: analytics.activeProjects,
            colorClass: "text-success",
        },
        {
            title: "Completed Projects",
            value: analytics.completedProjects,
            colorClass: "text-muted-foreground",
        },
        {
            title: "Total Tasks",
            value: analytics.totalTasks,
            colorClass: "text-primary",
        },
    ];


    return (
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardData.map((card, index) => (
                <Card key={card.title}>
                    <CardHeader className="flex flex-row item-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${card.colorClass}`}>{card.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}