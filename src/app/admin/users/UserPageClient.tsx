'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/appLayout';
import { useRouter } from 'next/navigation';
import UserTable from '@/components/tableResponsibe';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function UsersPageClient({ users }: { users: User[] }) {
    const router = useRouter();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <AppLayout>
            <div className="bg-blue-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-md shadow-md p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold text-blue-900">Lista de Usuarios</h1>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full sm:w-auto">
                                    {selectedUser ? 'Acciones para selección' : 'Crear nuevo usuario'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-64">
                                <div className="flex flex-col space-y-2">
                                    {selectedUser ? (
                                        <>
                                            <p className="text-sm text-gray-700">Seleccionado: {selectedUser.name}</p>
                                            <Button
                                                className="w-full"
                                                onClick={() => router.push(`/admin/users/${selectedUser.id}/edit`)}
                                            >
                                                Editar Usuario
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-700">No hay usuario seleccionado</p>
                                            <Button
                                                className="w-full"
                                                onClick={() => router.push('/admin/users/create')}
                                            >
                                                Crear nuevo usuario
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <UserTable users={users} onSelect={setSelectedUser} />
                </div>
            </div>

        </AppLayout>
    );
}
