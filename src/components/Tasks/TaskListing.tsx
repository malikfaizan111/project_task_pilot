import React, { useState, useEffect } from 'react';
import { useProjects } from '@/context/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarIcon, Edit, Search } from 'lucide-react';
import { Task } from '@/types/project';
import { format, startOfToday } from 'date-fns';
import { TaskForm } from './TaskForm';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type TaskListingProps = {
    projectId: number;
}

export const TaskListing: React.FC<TaskListingProps> = ({ projectId }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { projects, getTasksByProjectId, updateTask, deleteTask } = useProjects();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        const projectTasks = getTasksByProjectId(projectId);
        setTasks(projectTasks);
    }, [projectId, getTasksByProjectId, projects]);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });


    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Completed': return 'secondary';
            case 'In Progress': return 'default';
            case 'Pending': return 'outline';
            default: return 'outline';
        }
    };

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority) {
            case 'High': return 'destructive';
            case 'Medium': return 'default';
            case 'Low': return 'outline';
            default: return 'outline';
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsEditDialogOpen(true);
    };

    const handleDelete = async (taskId: number) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(taskId);
        }
    };

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        await updateTask(taskId, { status: newStatus as Task['status'] });
    };

    const handleDateChange = async (taskId: number, date: Date | undefined) => {
        if (!date) return;
        setSelectedDate(date);
        await updateTask(taskId, { dueDate: date.toISOString() });
    };

    return (
        <>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full lg:w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-full lg:w-48">
                                <SelectValue placeholder="Filter by priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Priority</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Tasks ({filteredTasks.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Assignee</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-mono text-sm">#{task.id}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{task.title}</div>
                                        </TableCell>
                                        <TableCell>{task.assignee}</TableCell>
                                        <TableCell>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100"
                                                    >
                                                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                                                        <span className="text-sm text-gray-700">
                                                            {format(task.dueDate, "MMM dd, yyyy")}
                                                        </span>
                                                    </button>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-[340px] p-0 border border-gray-200 rounded-lg shadow-lg">
                                                    <Calendar
                                                        className="w-full"
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={(date) => handleDateChange(task.id, date)}
                                                        disabled={(date) => date < startOfToday()}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={task.status}
                                                onValueChange={(value) => handleStatusChange(task.id, value)}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue>
                                                        <Badge variant={getStatusBadgeVariant(task.status)}>
                                                            {task.status}
                                                        </Badge>
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getPriorityBadgeVariant(task.priority)}>
                                                {task.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(task)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(task.id)}
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

                    {filteredTasks.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No tasks found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    {editingTask && (
                        <TaskForm
                            task={editingTask}
                            projectId={projectId}
                            onSuccess={() => {
                                setIsEditDialogOpen(false);
                                setEditingTask(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>

        </>
    );
}