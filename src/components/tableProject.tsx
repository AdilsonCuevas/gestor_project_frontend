'use client';

import { useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export interface Project {
    id: string;
    name: string;
    description?: string;
    status: 'planning' | 'in_progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    startDate?: string;
    endDate?: string;
    managerId: string;
    developersIds: string[];
}

interface ProjectTableProps {
    projects: Project[];
    onSelect: (project: Project | null) => void;
}

export default function ProjectTable({ projects, onSelect }: ProjectTableProps) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const perPage = 10;

    const filtered = Array.isArray(projects)
        ? projects.filter((project) =>
            project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.status.toLowerCase().includes(search.toLowerCase()) ||
            project.priority.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    const totalPages = Math.ceil(filtered.length / perPage);
    const current = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleRowClick = (p: Project) => {
        const same = selectedId === p.id;
        setSelectedId(same ? null : p.id);
        onSelect(same ? null : p);
    };

    return (
        <div className="space-y-6 p-4 bg-blue-50 rounded-xl shadow-md">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Input
                    placeholder="Buscar por nombre, estado o prioridad"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:max-w-xs border-blue-200 focus-visible:ring-blue-500"
                />
            </div>

            <div className="overflow-x-auto rounded-md border border-blue-100 shadow-sm bg-white">
                <Table className="min-w-full text-sm">
                    <TableHeader className="bg-blue-100 text-blue-900">
                        <TableRow>
                            <TableHead className="min-w-[120px]">Nombre</TableHead>
                            <TableHead className="min-w-[200px]">Descripción</TableHead>
                            <TableHead className="min-w-[100px]">Estado</TableHead>
                            <TableHead className="min-w-[100px]">Prioridad</TableHead>
                            <TableHead className="min-w-[100px]">Inicio</TableHead>
                            <TableHead className="min-w-[100px]">Fin</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {current.map((p) => (
                            <TableRow
                                key={p.id}
                                onClick={() => handleRowClick(p)}
                                className={`cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${selectedId === p.id ? 'bg-blue-100' : ''
                                    }`}
                            >
                                <TableCell className="font-medium text-blue-900">{p.name}</TableCell>
                                <TableCell className="text-gray-700 truncate max-w-[240px]">{p.description}</TableCell>
                                <TableCell>
                                    <span className="capitalize px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">
                                        {p.status.replace('_', ' ')}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${p.priority === 'high'
                                            ? 'bg-red-100 text-red-700'
                                            : p.priority === 'medium'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}
                                    >
                                        {p.priority}
                                    </span>
                                </TableCell>
                                <TableCell>{p.startDate ? new Date(p.startDate).toISOString().slice(0, 10) : '-'}</TableCell>
                                <TableCell>{p.endDate ? new Date(p.endDate).toISOString().slice(0, 10) : '-'}</TableCell>
                            </TableRow>
                        ))}

                        {current.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                    No hay proyectos disponibles.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center pt-2">
                <Pagination>
                    <PaginationContent className="gap-4">
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        <PaginationItem className="text-blue-800 text-sm font-medium">
                            Página {currentPage} de {totalPages}
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