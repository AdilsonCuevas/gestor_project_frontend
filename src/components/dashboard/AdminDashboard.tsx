'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bar, Doughnut } from 'react-chartjs-2';
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
    users: {
        id: string;
        name: string;
        role: string;
    }[];
}

export default function AdminDashboard({ data }: { data: DataProps }) {

    const [taskStatusData, setTaskStatusData] = useState<any | null>(null);
    const [projectByManagerData, setProjectByManagerData] = useState<any | null>(null);
    const tasks = data?.tasks ?? [];
    const projects = data?.project ?? [];
    const users = data?.users ?? [];

    useEffect(() => {
        const processData = async () => {
            const processTasksByStatus = async () => {
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
            };

            const processProjectsByManager = async () => {
                const managerProjects = users
                    .filter((u) => u.role === 'manager')
                    .map((manager) => {
                        const count = projects.filter((p) => p.managerId === manager.id).length;
                        return { name: manager.name, count };
                    });

                setProjectByManagerData({
                    labels: managerProjects.map((m) => m.name),
                    datasets: [
                        {
                            label: 'Proyectos por Manager',
                            data: managerProjects.map((m) => m.count),
                            backgroundColor: ['#a78bfa', '#f472b6'],
                        },
                    ],
                });
            };

            await Promise.all([
                processTasksByStatus(),
                processProjectsByManager()
            ]);
        };

        processData();
    }, [tasks, projects, users]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">Resumen General de registros</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="bg-blue-100">
                            <CardContent className="flex flex-col items-center p-4">
                                <span className="text-sm text-gray-600">Usuarios</span>
                                <span className="text-2xl font-bold">{users.length}</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-green-100">
                            <CardContent className="flex flex-col items-center p-4">
                                <span className="text-sm text-gray-600">Proyectos</span>
                                <span className="text-2xl font-bold">{projects.length}</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-yellow-100">
                            <CardContent className="flex flex-col items-center p-4">
                                <span className="text-sm text-gray-600">Tareas</span>
                                <span className="text-2xl font-bold">{tasks.length}</span>
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
                    <h2 className="text-xl font-semibold mb-4">Proyectos por Manager</h2>
                    {projectByManagerData ? <Doughnut data={projectByManagerData} /> : <p>Cargando gráfico...</p>}
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">Últimos Usuarios Registrados</h2>
                    <div className="space-y-2">
                        {users.slice(-10).reverse().map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 shadow-sm"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                </div>
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full
                                    ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                            user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'}`}
                                >
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
