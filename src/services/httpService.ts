import axios, { AxiosRequestConfig } from 'axios';

// Configuración base de Axios (opcional)
// const api = axios.create({
//     baseURL: '', // Opcional, puedes definir una base URL en .env
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

export async function httpRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown,
    config?: AxiosRequestConfig
): Promise<T> {
    try {
        const response = await axios.request<T>({
            url,
            method,
            data: body,
            ...config,
        });

        return response.data;
    } catch (error) {
        console.error('HTTP Request Error:', error);
        throw error;
    }
}
