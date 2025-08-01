'use client';

import TaskForm from '@/components/taskForm';
import { useRouter, useParams } from 'next/navigation';
import { createTasks } from '../../../project.api';
import AppLayout from '@/components/layout/appLayout';
import Cookies from 'js-cookie';

export default function CreateTaskPage() {
    const router = useRouter();
    const params = useParams();
    const { idpj } = params;
    const ids = params.idpj as string;
    const token = Cookies.get('accessToken');

    const handleCreate = async (data: any) => {
        await createTasks(ids, data, token);
        router.push(`/admin/projects/tasks/${idpj}`);
        router.refresh();
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-blue-50 p-4 sm:p-8 md:p-12 flex justify-center">
                <div className="w-full max-w-3xl space-y-6">
                    <h1 className="text-2xl font-bold mb-4">Crear tarea</h1>
                    <TaskForm onSubmit={handleCreate} />
                </div>
            </div>
        </AppLayout>
    );
}
