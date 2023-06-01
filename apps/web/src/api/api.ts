import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
    data: T;
}

export async function sendRequest<T>(url: string, token: string, method: string, data?: unknown): Promise<T> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axios.request({
            url,
            method,
            headers: { Authorization: `Bearer ${token}` },
            data,
        });

        return response.data.data;
    } catch (error: unknown) {
        console.error('API request failed:', (error as AxiosError)?.response?.data ?? error);
        throw error;
    }
}
