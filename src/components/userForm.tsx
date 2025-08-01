'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';

export interface UserFormProps {
    initialData?: {
        name: string;
        email: string;
        role: 'admin' | 'manager' | 'developer';
        avatar?: string;
    };
    onSubmit: (data: {
        name: string;
        email: string;
        password?: string;
        role: 'admin' | 'manager' | 'developer';
        avatar?: string;
    }) => void;
}

export default function UserForm({ initialData, onSubmit }: UserFormProps) {
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        password?: string;
        role: 'admin' | 'manager' | 'developer';
        avatar?: string;
    }>({
        name: '',
        email: '',
        password: '',
        role: 'developer',
        avatar: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                name: prev.name,
                email: prev.email,
                password: prev.password,
                role: prev.role,
                avatar: prev.avatar,
            }));
        }
    }, [initialData]);

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-blue-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-xl w-full mx-auto bg-white p-6 rounded-md shadow-md"
            >
                <h2 className="text-2xl font-bold text-blue-900 text-center">
                    {initialData ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                </h2>

                <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="password">
                        Contraseña {initialData && <span className="text-sm text-gray-500">(dejar vacío para no cambiar)</span>}
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder={initialData ? '********' : ''}
                        required={!initialData}
                    />
                </div>

                <div>
                    <Label htmlFor="role">Rol</Label>
                    <Select
                        value={formData.role}
                        onValueChange={(value: string) => handleChange('role', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="avatar">URL del Avatar</Label>
                    <Input
                        id="avatar"
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => handleChange('avatar', e.target.value)}
                        placeholder="https://..."
                    />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    {initialData ? 'Actualizar Usuario' : 'Crear Usuario'}
                </Button>
            </form>
        </div>

    );
}
