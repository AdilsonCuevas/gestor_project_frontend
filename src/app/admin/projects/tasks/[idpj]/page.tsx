import TasksClient from './pageCliente';
import { cookies } from 'next/headers';
import { getTasks } from '../../project.api';

interface PageProps {
    params: {
        idpj: string;
    };
}

export default async function TasksPage({ params }: PageProps) {
    const { idpj } = params;

    const token = (await cookies()).get('accessToken')?.value;

    const mockTasks = await getTasks(idpj, token);

    return <TasksClient mockTasks={mockTasks} />;
}

