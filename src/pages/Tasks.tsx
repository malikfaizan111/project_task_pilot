import { TaskAdd } from "@/components/Tasks/TaskAdd";
import { TaskDashboard } from "@/components/Tasks/TaskDashboard";
import { TaskListing } from "@/components/Tasks/TaskListing";
import { useParams } from "react-router-dom";

const Tasks = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id || '0');

    return (
        <div className="container mx-auto py-6 space-y-6">
            <TaskAdd projectId={projectId}/>
            <TaskDashboard projectId={projectId}/>
            <TaskListing projectId={projectId}/>
        </div>
    )
}

export default Tasks