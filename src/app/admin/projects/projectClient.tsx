'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/appLayout';
import ProjectTable, { Project } from '@/components/tableProject';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { deleteProjects } from './project.api';
import Cookies from 'js-cookie';

interface Projects {
    id: string;
    name: string;
    description?: string;
    status: 'planning' | 'in_progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    startDate?: string;
    endDate?: string;
    managerId: string;
    developersIds: string[];
}

export default function ProjectsClient({ mockProjects }: { mockProjects: Projects[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const router = useRouter();

    const token = Cookies.get('accessToken');

    const handleDelete = async () => {
        if (selectedProject) {
            await deleteProjects(selectedProject.id, token);
            setSelectedProject(null);
            router.refresh();
        }
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6 bg-blue-50 min-h-screen rounded-md">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-blue-900">Lista de Proyectos</h1>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                                {selectedProject ? 'Acciones para selección' : 'Nuevo proyecto'}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent align="end" className="w-64 bg-white border shadow-lg rounded-md">
                            <div className="flex flex-col gap-3">
                                {selectedProject ? (
                                    <>
                                        <p className="text-sm text-gray-700 font-medium">
                                            Proyecto: <span className="text-blue-700">{selectedProject.name}</span>
                                        </p>
                                        <Button
                                            onClick={() => router.push(`/admin/projects/${selectedProject.id}/edit`)}
                                            className="w-full"
                                        >
                                            Editar Proyecto
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/admin/projects/tasks/${selectedProject.id}`)}
                                            className="w-full"
                                        >
                                            Visualizar Tareas
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleDelete}
                                            className="w-full text-red-600 border-red-300 hover:bg-red-50"
                                        >
                                            Eliminar Proyecto
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-600">No hay proyecto seleccionado</p>
                                        <Button
                                            onClick={() => router.push("/admin/projects/create")}
                                            className="w-full"
                                        >
                                            Crear nuevo proyecto
                                        </Button>
                                    </>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <ProjectTable projects={mockProjects} onSelect={setSelectedProject} />
            </div>

        </AppLayout>

    );
}