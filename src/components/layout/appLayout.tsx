'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
}

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setUser(decoded);
            } catch (e) {
                console.error('Token inválido:', e);
            }
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("authTokens");
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex flex-col sm:flex-row bg-gray-200 relative">

            <div className="flex sm:hidden items-center justify-between bg-white shadow p-4 z-10">
                <span className="text-lg font-semibold text-blue-900">Panel</span>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            <aside
                className={`bg-blue-300 text-white w-64 p-6 flex-col z-20 transition-all duration-300
                    ${sidebarOpen ? 'absolute sm:relative top-16 left-0 flex' : 'hidden sm:flex'}
                    sm:h-screen sm:overflow-y-auto sm:sticky sm:top-0
                    `}
            >
                <div className="flex flex-col items-center space-y-2 mb-6">
                    <Avatar className="w-16 h-16 border border-white">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-blue-900 bg-white">U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white">{user?.name}</span>
                </div>

                <nav className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start text-white hover:bg-blue-800" onClick={() => router.push('/admin/dashboard')}>
                        Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start text-white hover:bg-blue-800" onClick={() => router.push('/admin/profile')}>
                        Perfil
                    </Button>
                    {user?.role !== 'developer' && (
                        <Button variant="ghost" className="justify-start text-white hover:bg-blue-800" onClick={() => router.push('/admin/users')}>
                            Usuarios
                        </Button>
                    )}
                    <Button variant="ghost" className="justify-start text-white hover:bg-blue-800" onClick={() => router.push('/admin/projects')}>
                        Proyectos
                    </Button>
                </nav>

                <div className="mt-auto pt-6">
                    <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </aside>

            <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
    );
}



