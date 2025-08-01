'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { getDeveloper } from '@/app/admin/projects/project.api';
import Cookies from 'js-cookie';

export interface ProjectFormProps {
    initialData?: {
        name: string;
        description?: string;
        status: 'planning' | 'in_progress' | 'completed' | 'cancelled';
        priority: 'low' | 'medium' | 'high';
        startDate?: string;
        endDate?: string;
        managerId: string;
        developersIds: string[];
    };
    onSubmit: (data: ProjectFormProps['initialData']) => void;
}

interface User {
    id: string;
    name: string;
    role: string;
}

type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'cancelled';
type ProjectPriority = 'low' | 'medium' | 'high';

export default function ProjectForm({ initialData, onSubmit }: ProjectFormProps) {
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        status: ProjectStatus;
        priority: ProjectPriority;
        startDate: string;
        endDate: string;
        managerId: string;
        developersIds: string[];
    }>({
        name: '',
        description: '',
        status: 'planning',
        priority: 'medium',
        startDate: '',
        endDate: '',
        managerId: '',
        developersIds: [],
    });


    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description ?? '',
                status: initialData.status,
                priority: initialData.priority,
                startDate: initialData.startDate ?? '',
                endDate: initialData.endDate ?? '',
                managerId: initialData.managerId,
                developersIds: initialData.developersIds,
            });
        }
    }, [initialData]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = Cookies.get('accessToken');
                const data = await getDeveloper(token);
                setUsers(data);
            } catch (err) {
                console.error('Error fetching users', err);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (field: string, value: string | string[]) => {
        setFormData({ ...formData, [field]: value });
    };

    const toggleDeveloper = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            developersIds: prev.developersIds.includes(id)
                ? prev.developersIds.filter((devId) => devId !== id)
                : [...prev.developersIds, id],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const managers = Array.isArray(users)
        ? users.filter((u) => u.role === 'manager')
        : [];

    const developers = Array.isArray(users)
        ? users.filter((u) => u.role === 'developer')
        : [];

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl w-full bg-blue-50 p-6 rounded-xl shadow-md border border-blue-100"
        >
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {initialData ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            </h2>

            <div>
                <Label htmlFor="name" className="text-blue-800">Nombre del proyecto</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="description" className="text-blue-800">Descripción</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="mt-1"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="status" className="text-blue-800">Estado</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(val: string | string[]) => handleChange('status', val)}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="planning">Planificación</SelectItem>
                            <SelectItem value="in_progress">En progreso</SelectItem>
                            <SelectItem value="completed">Completado</SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="priority" className="text-blue-800">Prioridad</Label>
                    <Select
                        value={formData.priority}
                        onValueChange={(val: string | string[]) => handleChange('priority', val)}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Baja</SelectItem>
                            <SelectItem value="medium">Media</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="startDate" className="text-blue-800">Fecha de inicio</Label>
                    <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate ? new Date(formData.startDate).toISOString().slice(0, 10) : ''}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="endDate" className="text-blue-800">Fecha de finalización</Label>
                    <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate ? new Date(formData.endDate).toISOString().slice(0, 10) : ''}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="mt-1"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="managerId" className="text-blue-800">Manager</Label>
                <Select
                    value={formData.managerId}
                    onValueChange={(val: string | string[]) => handleChange('managerId', val)}
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona un manager" />
                    </SelectTrigger>
                    <SelectContent>
                        {managers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="text-blue-800">Desarrolladores</Label>
                <ScrollArea className="max-h-40 border rounded-md p-2 mt-1 bg-white">
                    {developers.map((user) => (
                        <div key={user.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`dev-${user.id}`}
                                checked={formData.developersIds?.includes(user.id)}
                                onCheckedChange={() => toggleDeveloper(user.id)}
                            />
                            <label htmlFor={`dev-${user.id}`} className="text-sm text-blue-800">
                                {user.name}
                            </label>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                {initialData ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            </Button>
        </form>

    );
}
