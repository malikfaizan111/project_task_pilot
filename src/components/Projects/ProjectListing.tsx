import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Search, Eye } from 'lucide-react';
import { ProjectWithTasks } from '@/types/project';
import { ProjectForm } from './ProjectForm';


export const ProjectListing: React.FC = () => {
  const { projects, deleteProject } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingProject, setEditingProject] = useState<ProjectWithTasks | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Completed': return 'secondary';
            case 'On Hold': return 'outline';
            default: return 'default';
        }
    };

    const handleEdit = (project: ProjectWithTasks) => {
        setEditingProject(project);
        setIsEditDialogOpen(true);
    };

    const handleDelete = async (projectId: number) => {
        if (window.confirm('Are you sure you want to delete this project? This will also delete all associated tasks.')) {
            await deleteProject(projectId);
        }
    };

    return (
        <>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="On Hold">On Hold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Projects ({filteredProjects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Tasks</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProjects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-mono text-sm">#{project.id}</TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{project.name}</div>
                                                <div className="text-sm text-muted-foreground">{project.description}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{project.owner}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadgeVariant(project.status)}>
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <Progress value={project.progress} className="w-24" />
                                                <span className="text-xs text-muted-foreground">{project.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">{project.taskCount}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link to={`/projects/${project.id}/tasks`}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View Tasks
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(project)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(project.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No projects found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* Edit Project Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    {editingProject && (
                        <ProjectForm
                            project={editingProject}
                            onSuccess={() => {
                                setIsEditDialogOpen(false);
                                setEditingProject(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}