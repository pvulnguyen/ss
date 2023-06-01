import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

/**
 * A generic function to send HTTP requests via axios.
 *
 * @param token  - The access token to set in the request headers.
 * @param url    - The api endpoint to send the request to.
 * @param method - The HTTP method to use for the request.
 * @param data   - The data to set in the request body when sending an HTTP POST request.
 *
 * @returns A promise that resolves to the response data or rejects with an error.
 */

export async function sendRequest<T>(token: string, url: string, method: string, data?: unknown): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.request({
            url,
            method,
            headers: { Authorization: `Bearer ${token}` },
            data,
        });

        return response.data;
    } catch (error: unknown) {
        console.error('API request failed:', (error as AxiosError)?.response?.data ?? error);
        throw error;
    }
}
