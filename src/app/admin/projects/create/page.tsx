'use client';

import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/projectForm';
import AppLayout from '@/components/layout/appLayout';
import { createProjects } from '../project.api';
import Cookies from 'js-cookie';

export default function CreateProjectPage() {
    const router = useRouter();

    const handleCreate = async (data: any) => {
        const token = Cookies.get('accessToken');
        await createProjects(data, token);
        router.push('/admin/projects');
        router.refresh();
    };

    return (
        <AppLayout>
            <div className="px-4 sm:px-6 md:px-10 py-8 bg-blue-50 min-h-screen flex justify-center">
                <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                    <ProjectForm onSubmit={handleCreate} />
                </div>
            </div>

        </AppLayout>

    );
}
