'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserForm from '@/components/userForm';
import AppLayout from '@/components/layout/appLayout';
import { updateUser, getUserOne } from "../../user.api";
import Cookies from 'js-cookie';

export default function EditUserPage() {
    const router = useRouter();
    const params = useParams();
    const ids = params.id as string;
    const { id } = params;

    const [userData, setUserData] = useState(null);
    const token = Cookies.get('accessToken');

    useEffect(() => {
        // Simula fetch real
        const fetchData = async () => {

            const res = await getUserOne(ids, token);
            setUserData(res);
        };

        fetchData();
    }, [id]);

    const handleUpdate = async (data: any) => {
        await updateUser(ids, data, token);
        router.push('/admin/users');
        router.refresh();
    };

    if (!userData) return <p>Cargando...</p>;

    return (
        <AppLayout>
            <div className="bg-blue-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">
                    <UserForm onSubmit={handleUpdate} initialData={userData} />
                </div>
            </div>
        </AppLayout>
    );
}
