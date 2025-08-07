'use client';

import AppLayout from '@/components/layout/appLayout';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard';
const API_URL = 'https://gestorprojectbackend-production.up.railway.app';

interface JwtPayload {
    sub: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
}

export interface DataPropsss {
    tasks: {
        id: string;
        status: string;
        title: string;
        projectId: string;
        assignedTo: string[];
    }[];
    project: {
        name: string;
        status: string;
        managerId: string;
    }[];
    users: {
        id: string;
        name: string;
        role: string;
    }[];
}

export default function DashboardPage() {

    const [user, setUser] = useState<JwtPayload | null>(null);
    const [userData, setData] = useState<DataPropsss | null>(null);

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

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user) return;

            try {
                const token = Cookies.get('accessToken');
                const res = await fetch(`${API_URL}/auth/dashboard?role=${user?.role}&email=${user?.email}`, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const json: DataPropsss = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserInfo();
    }, [user]);

    if (!user && !userData) return <AppLayout><div>Cargando...</div></AppLayout>;

    const role = user?.role;

    switch (role) {
        case 'admin':
            return <AppLayout><AdminDashboard data={userData!} /></AppLayout>;
        case 'manager':
            return <AppLayout><ManagerDashboard data={userData!} /></AppLayout>;
        case 'developer':
            return <AppLayout><ManagerDashboard data={userData!} /></AppLayout>;
        default:
            return <AppLayout><div>No tienes acceso.</div></AppLayout>;
    }
}
