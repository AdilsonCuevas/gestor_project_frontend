
'use client';

import { useRouter } from 'next/navigation';
import UserForm from '@/components/userForm';
import AppLayout from '@/components/layout/appLayout';
import { createUsers } from "../user.api";
import Cookies from 'js-cookie';

export default function CreateUserPage() {
    const router = useRouter();

    const handleCreate = async (data: any) => {
        const token = Cookies.get('accessToken');
        await createUsers(data, token);
        router.push('/admin/users');
        router.refresh();
    };

    return (
        <AppLayout>
            <div className="bg-blue-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">
                    <UserForm onSubmit={handleCreate} />
                </div>
            </div>
        </AppLayout>

    );
}
