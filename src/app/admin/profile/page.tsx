'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/components/layout/appLayout';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface JwtPayload {
    sub: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    createdAt: string
}

export default function UserDetailPage() {
    let user: JwtPayload | null = null;

    if (typeof window !== 'undefined') {
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                user = jwtDecode<JwtPayload>(token);
            } catch (e) {
                console.error('Token inválido:', e);
            }
        }
    }

    if (!user) return <p className="p-4 text-muted-foreground">Cargando usuario...</p>;

    return (
        <AppLayout>
            <div className="flex justify-center p-4 sm:p-6">
                <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-blue-50 shadow-md">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-center sm:text-left">
                            <Avatar className="h-24 w-24 mx-auto sm:mx-0">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{user.name}</CardTitle>
                                <h3 className="text-xl text-muted-foreground">{user.role}</h3>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4 text-xl text-gray-800">
                        <div>
                            <strong>Email:</strong>
                            <h3>{user.email}</h3>
                        </div>
                        <div>
                            <strong>Rol:</strong>
                            <h3>{user.role}</h3>
                        </div>
                        <div>
                            <strong>Creado:</strong>
                            <h3>{new Date(user.createdAt).toLocaleDateString('es-CO', { dateStyle: 'medium' })}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>

    );
}
