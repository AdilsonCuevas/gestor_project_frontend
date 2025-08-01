import { getUsers } from '../users/user.api';
import UsersPageClient from './UserPageClient';
import { cookies } from 'next/headers';

export default async function UsersPage() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('accessToken')?.value;

    const users = await getUsers(token);

    return <UsersPageClient users={users} />;
}