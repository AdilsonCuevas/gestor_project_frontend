'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskForm from '@/components/taskForm';
import { updateTasks, getTaskOne, } from '@/app/admin/projects/project.api';
import Cookies from 'js-cookie';
import AppLayout from '@/components/layout/appLayout';

export default function EditTaskPage() {
    const { idpj } = useParams();
    const { id } = useParams();
    const params = useParams();
    const ids = params.id as string;
    const router = useRouter();
    const [task, setTask] = useState(null);
    const token = Cookies.get('accessToken');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTaskOne(ids, token);
            setTask(data);
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (data: any) => {
        await updateTasks(ids, data, token);
        router.push(`/admin/projects/tasks/${idpj}`);
        router.refresh();
    };

    if (!task) return <p className="p-4">Cargando tarea...</p>;

    return (
        <AppLayout>
            <div className="min-h-screen bg-blue-50 p-4 sm:p-8 md:p-12 flex justify-center">
                <div className="w-full max-w-3xl space-y-6">
                    <h1 className="text-2xl font-bold text-center text-blue-900">Editar tarea</h1>
                    <TaskForm initialData={task} onSubmit={handleUpdate} />
                </div>
            </div>
        </AppLayout>
    );
}
