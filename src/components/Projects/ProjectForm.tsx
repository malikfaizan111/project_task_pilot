import { useProjects } from "@/context/ProjectContext";
import { Project } from "@/types/project";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

const projectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
    owner: z.string().min(1, 'Owner is required'),
    status: z.enum(['Active', 'Completed', 'On Hold'])
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    project?: Project;
    onSuccess: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess }) => {

    const { createProject, updateProject } = useProjects();
    const isEditing = !!project;

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project?.name || '',
            description: project?.description || '',
            owner: project?.owner || '',
            status: project?.status || 'Active',
        }
    });


    const onSubmit = async (data: ProjectFormData) => {
        try {
            if (isEditing && project) {
                await updateProject(project.id, data);
                toast({
                    title: 'Success',
                    description: 'Project updated successfully',
                });
            }
            else {
                const newProject: any = {
                    name: data.name,
                    description: data.description,
                    owner: data.owner,
                    status: data.status,
                    task: [] as number[]
                };
                await createProject(newProject);
                toast({
                    title: 'Success',
                    description: 'Project created successfully',
                });
            }
            onSuccess();
        }
        catch (error) {
            console.error('Failed to save project:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to save project',
                variant: 'destructive',
            });
        }
    }
    // Extract button text from nested ternary
    let buttonText = '';
    if (form.formState.isSubmitting) {
        buttonText = 'Saving...';
    } else if (isEditing) {
        buttonText = 'Update Project';
    } else {
        buttonText = 'Create Project';
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter project description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Owner</FormLabel>
              <FormControl>
                <Input placeholder="Enter owner name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {buttonText}
          </Button>
        </div>
      </form>
        </Form>
    );
}