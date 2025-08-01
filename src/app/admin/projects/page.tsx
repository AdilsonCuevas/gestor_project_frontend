
import ProjectsClient from './projectClient';
import { cookies } from 'next/headers';
import { getProjects } from './project.api';

export default async function ProjectsPage() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('accessToken')?.value;

    const mockProjects = await getProjects(token);

    return <ProjectsClient mockProjects={mockProjects} />;
}

