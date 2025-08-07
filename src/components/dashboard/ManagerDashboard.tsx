'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export interface DataProps {
    tasks: {
        id: string;
        status: string;
        title: string;
        projectId: string;
        assignedTo: string[];
    }[];
    project: {
        name: string;
        status: string;
        managerId: string;
    }[];
}

export function ManagerDashboard({ data }: { data: DataProps }) {
    const tasks = data?.tasks ?? [];
    const managedProjects = data?.project ?? [];
    const [taskStatusData, setTaskStatusData] = useState<any | null>(null);

    useEffect(() => {
        const fetchTaskStatusData = async () => {
            try {
                const taskCount = tasks.reduce((acc, task) => {
                    acc[task.status] = (acc[task.status] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                setTaskStatusData({
                    labels: Object.keys(taskCount),
                    datasets: [
                        {
                            label: 'Tareas por Estado',
                            data: Object.values(taskCount),
                            backgroundColor: ['#f87171', '#facc15', '#60a5fa', '#34d399'],
                        },
                    ],
                });
            } catch (error) {
                console.error('Error procesando las tareas por estado:', error);
            }
        };

        fetchTaskStatusData();
    }, [tasks]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">Tus Proyectos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-blue-100">
                            <CardContent className="flex flex-col items-center p-4">
                                <span className="text-sm text-gray-600">Planning</span>
                                <span className="text-2xl font-bold">
                                    {managedProjects.filter(p => p.status === 'planning').length}
                                </span>
                            </CardContent>
                        </Card>
                        <Card className="bg-yellow-100">
                            <CardContent className="flex flex-col items-center p-4">
                                <span className="text-sm text-gray-600">In-Progress</span>
                                <span className="text-2xl font-bold">
                                    {managedProjects.filter(p => p.status === 'in_progress').length}
                                </span>
                            </CardContent>
                        </Card>
                        <Card className="bg-green-100">
                            <CardContent className="flex flex-col items-center p-4">
                                <span className="text-sm text-gray-600">Completed</span>
                                <span className="text-2xl font-bold">
                                    {managedProjects.filter(p => p.status === 'completed').length}
                                </span>
                            </CardContent>
                        </Card>
                        <Card className="bg-red-100">
                            <CardContent className="flex flex-col items-center p-4">
                                <span className="text-sm text-gray-600">Cancelled</span>
                                <span className="text-2xl font-bold">
                                    {managedProjects.filter(p => p.status === 'cancelled').length}
                                </span>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">Tareas por Estado</h2>
                    {taskStatusData ? <Bar data={taskStatusData} /> : <p>Cargando gráfico...</p>}
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">Asignación de Tareas</h2>
                    <div className="space-y-2">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-md px-4 py-2 shadow-sm"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                                </div>
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full
                                    ${task.status === 'todo'
                                            ? 'bg-gray-200 text-gray-800'
                                            : task.status === 'in_progress'
                                                ? 'bg-blue-200 text-blue-800'
                                                : task.status === 'review'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : task.status === 'done'
                                                        ? 'bg-green-200 text-green-800'
                                                        : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {task.status.replace('_', ' ')}
                                </span>
                            </div>
                        ))}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
