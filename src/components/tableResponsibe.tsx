'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

interface UserTableProps {
    users: User[];
    onSelect: (user: User | null) => void;
}

export default function UserTable({ users, onSelect }: UserTableProps) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const perPage = 10;

    const filteredUsers = Array.isArray(users)
        ? users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    const totalPages = Math.ceil(filteredUsers.length / perPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const handleSelect = (user: User) => {
        const isSame = selectedUserId === user.id;
        const newSelection = isSame ? null : user;
        setSelectedUserId(isSame ? null : user.id);
        onSelect(newSelection);
    };

    return (
        <div className="bg-blue-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8 space-y-6 rounded-md">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <Input
                    placeholder="Buscar por nombre, correo o rol"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="overflow-auto rounded-md border shadow-sm bg-white">
                <Table>
                    <TableHeader className="bg-blue-100 text-blue-900">
                        <TableRow>
                            <TableHead className="font-bold">NOMBRE</TableHead>
                            <TableHead className="font-bold">CORREO</TableHead>
                            <TableHead className="font-bold">ROL</TableHead>
                            <TableHead className="font-bold">CREACIÓN</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                onClick={() => handleSelect(user)}
                                className={`cursor-pointer hover:bg-blue-50 transition ${selectedUserId === user.id ? 'bg-blue-100' : ''}`}
                            >
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell>
                                    {user.createdAt
                                        ? new Date(user.createdAt).toISOString().slice(0, 10)
                                        : '-'}
                                </TableCell>
                            </TableRow>
                        ))}

                        {paginatedUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                    No se encontraron usuarios.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <span className="text-sm text-gray-700 px-2">
                                Página {currentPage} de {totalPages}
                            </span>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>

    );
}
