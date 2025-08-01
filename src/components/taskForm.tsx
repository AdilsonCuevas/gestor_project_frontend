'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import Cookies from 'js-cookie';
import { getDeveloper } from '@/app/admin/projects/project.api';

export interface TaskFormProps {
    initialData?: {
        title: string;
        description: string;
        status: 'todo' | 'in_progress' | 'review' | 'done';
        priority: 'low' | 'medium' | 'high';
        assignedTo: string;
        estimatedHours: string;
        actualHours: string;
        dueDate: string;
    };
    onSubmit: (data: TaskFormData) => void;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignedTo: string;
    estimatedHours: string;
    actualHours: string;
    dueDate: string;
}

interface User {
    id: string;
    name: string;
    role: string;
}

export default function TaskForm({ initialData, onSubmit }: TaskFormProps) {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        assignedTo: '',
        estimatedHours: '',
        actualHours: '',
        dueDate: '',
    });

    console.log(formData);

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                status: initialData.status,
                priority: initialData.priority,
                assignedTo: initialData.assignedTo,
                estimatedHours: initialData.estimatedHours,
                actualHours: initialData.actualHours,
                dueDate: initialData.dueDate,
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

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const developers = Array.isArray(users)
        ? users.filter((u) => u.role === 'developer')
        : [];

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl w-full">
            <div>
                <Label htmlFor="title">Título</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label>Estado</Label>
                    <Select value={formData.status} onValueChange={(val: any) => handleChange('status', val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="in_progress">En progreso</SelectItem>
                            <SelectItem value="review">Revisión</SelectItem>
                            <SelectItem value="done">Hecho</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Prioridad</Label>
                    <Select value={formData.priority} onValueChange={(val: any) => handleChange('priority', val)}>
                        <SelectTrigger>
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

            <div>
                <Label htmlFor="assignedTo">Asignados</Label>
                <Select
                    value={formData.assignedTo}
                    onValueChange={(val: any) => handleChange('assignedTo', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un manager" />
                    </SelectTrigger>
                    <SelectContent>
                        {developers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="estimatedHours">Horas estimadas</Label>
                    <Input
                        id="estimatedHours"
                        type="number"
                        step="0.1"
                        value={formData.estimatedHours}
                        onChange={(e) => handleChange('estimatedHours', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="actualHours">Horas reales</Label>
                    <Input
                        id="actualHours"
                        type="number"
                        step="0.1"
                        value={formData.actualHours}
                        onChange={(e) => handleChange('actualHours', e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="dueDate">Fecha de entrega</Label>
                <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                />
            </div>

            <Button type="submit" className="w-full">
                {initialData ? 'Actualizar Tarea' : 'Crear Tarea'}
            </Button>
        </form>
    );
}
