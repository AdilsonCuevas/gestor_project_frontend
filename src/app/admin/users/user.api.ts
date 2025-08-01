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

export async function loginApi(data: any) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return await res.json();
}

export async function registerApi(data: any) {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await handleResponse(res);
        return result;
    } catch (error: any) {
        console.log('Register error:', error.message);
        throw error;
    }
}

export async function forgotApi(data: any) {
    const res = await fetch(`${API_URL}/auth/forgot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return await res.json();
}

export async function getProfile() {
    const data = await fetch(`${API_URL}/auth/profile`, {
        cache: "no-store",
    });
    return await data.json();
}

export async function createUsers(userData: any, tokens: any) {

    if (tokens) {

        const res = await fetch(`${API_URL}/users`, {
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

export async function getUsers(token: any) {

    if (token) {
        const res = await fetch(`${API_URL}/users`, {
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

export async function getUserOne(id: string, token: any) {

    if (token) {
        const res = await fetch(`${API_URL}/users/${id}`, {
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

export async function updateUser(id: string, userData: any, tokens: any) {

    if (tokens) {

        const res = await fetch(`${API_URL}/users/${id}`, {
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

/*
export async function getMovies(page: number, pageSize: number) {
    const data = await fetch(`http://localhost:4000/api/movies/popular?page=${page}&pageSize=${pageSize}`, {
        cache: "no-store",
    });
    const movies = await data.json();
    return movies.results;
}
*/
