'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProjectForm from '@/components/projectForm';
import AppLayout from '@/components/layout/appLayout';
import { updateProjects, getProject } from '../../project.api';
import Cookies from 'js-cookie';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const ids = params.id as string;
    const token = Cookies.get('accessToken');

    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        // Simula fetch real
        const fetchProject = async () => {
            const res = await getProject(ids, token);

            setProjectData(res);
        };

        fetchProject();
    }, [id]);

    const handleUpdate = async (data: any) => {
        await updateProjects(ids, data, token);
        router.push('/admin/projects');
        router.refresh();
    };

    if (!projectData) return <p className="p-4">Cargando proyecto...</p>;

    return (
        <AppLayout>
            <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                    <ProjectForm initialData={projectData} onSubmit={handleUpdate} />
                </div>
            </div>

        </AppLayout>

    );
}
