
const API_URL = 'https://gestorprojectbackend-production.up.railway.app';

async function handleResponse(res: Response) {
    const contentType = res.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await res.json() : null;

    if (!res.ok) {
        throw new Error(data?.message || 'Error en la solicitud');
    }

    return data;
}

export async function getProject(id: string, token: any) {

    if (token) {
        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } else {
        throw new Error("No se encontraron autenticación.");
    }
}

export async function getProjects(token: any) {
    if (token) {
        const res = await fetch(`${API_URL}/projects`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } else {
        throw new Error("No se encontraron autenticación.");
    }
}

export async function createProjects(userData: any, tokens: any) {

    if (tokens) {

        const res = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokens}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        return data;
    } else {
        throw new Error("No se encontraron tokens de autenticación.");
    }
}

export async function deleteProjects(id: string, tokens: any) {

    if (tokens) {

        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${tokens}`,
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(res);

    } else {
        throw new Error("No se encontraron tokens de autenticación.");
    }
}

export async function updateProjects(id: string, userData: any, token: any) {

    if (token) {

        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
            cache: "no-store",
        })
        return await res.json()

    } else {
        throw new Error("No se encontraron tokens de autenticación.");
    }
}
//tasks

export async function getTaskOne(id: string, token: any) {
    if (token) {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } else {
        throw new Error("No se encontraron autenticación.");
    }
}

export async function createTasks(id: string, userData: any, tokens: any) {

    if (tokens) {

        const res = await fetch(`${API_URL}/projects/${id}/tasks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokens}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        return data;
    } else {
        throw new Error("No se encontraron tokens de autenticación.");
    }
}

export async function deleteTasks(id: string, tokens: any) {

    if (tokens) {

        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${tokens}`,
            },
        });
        return await handleResponse(res);

    } else {
        throw new Error("No se encontraron tokens de autenticación.");
    }
}

export async function updateTasks(id: string, userData: any, tokens: any) {

    if (tokens) {

        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokens}`,
            },
            body: JSON.stringify(userData),
            cache: "no-store",
        })
        return await res.json()

    } else {
        throw new Error("No se encontraron tokens de autenticación.");
    }
}

export async function getTasks(id: string, token: any) {
    if (token) {
        const res = await fetch(`${API_URL}/projects/${id}/tasks`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } else {
        throw new Error("No se encontraron autenticación.");
    }
}

export async function getDeveloper(token: any) {
    if (token) {
        const res = await fetch(`${API_URL}/users/dev`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = res.json();
        return data;
    } else {
        throw new Error("No se encontraron autenticación.");
    }
}

