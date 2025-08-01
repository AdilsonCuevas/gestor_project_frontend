'use client';

import { useState } from 'react';
import TaskBoard from '@/components/canva/board';
import AppLayout from '@/components/layout/appLayout';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { deleteTasks } from '../../project.api';
import Cookies from 'js-cookie';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignedTo: string;
    active: boolean;
    dueDate?: string;
}

export default function TasksClient({ mockTasks }: { mockTasks: Task[] }) {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const router = useRouter();
    const token = Cookies.get('accessToken');
    const params = useParams();
    const { idpj } = params;

    const handleCardClick = (task: Task) => {
        setSelectedTask(task);
    };

    const handleDelete = async () => {
        if (selectedTask) {
            await deleteTasks(selectedTask.id, token);
            setSelectedTask(null);
            router.refresh();
        }
    };

    return (
        <AppLayout>
            <div className="p-4 relative">
                <h1 className="text-2xl font-bold mb-4">Tablero de Tareas</h1>

                <div className="fixed bottom-6 right-6">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="default">Opciones</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 space-y-2">
                            {selectedTask ? (
                                <>
                                    <Button variant="outline" className="w-full" onClick={() => router.push(`/admin/projects/tasks/${idpj}/${selectedTask.id}/edit`)}>
                                        Editar tarea
                                    </Button>
                                    <Button variant="destructive" className="w-full" onClick={handleDelete}>
                                        Eliminar tarea
                                    </Button>
                                </>
                            ) : (
                                <Button className="w-full" onClick={() => router.push(`/admin/projects/tasks/${idpj}/create`)}>
                                    Crear nueva tarea
                                </Button>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
                <TaskBoard
                    tasks={mockTasks}
                    onTaskSelect={handleCardClick}
                    selectedTask={selectedTask}
                />
            </div>
        </AppLayout>
    );
}