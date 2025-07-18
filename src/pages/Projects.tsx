import { ProjectDashboard } from "@/components/Projects/ProjectDashboard";
import { ProjectAdd } from "@/components/Projects/ProjectAdd";
import { ProjectListing } from "@/components/Projects/ProjectListing";
const Projects = () => {
    return (
        <div className="container mx-auto py-6 space-y-6">
            <ProjectDashboard />
            <ProjectAdd />
            <ProjectListing/>
        </div>
    )
};

export default Projects;