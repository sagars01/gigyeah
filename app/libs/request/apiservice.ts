export interface ApiResponse<T> {
    data: T;
    message?: string;
}

interface ApiError {
    message: string;
    statusCode?: number;
}

import axios, { AxiosInstance } from 'axios';

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseUrl?: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async get<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.get<ApiResponse<T>>(url);
            return response.data
        } catch (error: any) {
            const apiError: ApiError = this.handleError(error);
            throw apiError;
        }
    }

    async post<T>(path: string, data: unknown): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.post<ApiResponse<T>>(path, data);
            return response.data;
        } catch (error: any) {
            const apiError: ApiError = this.handleError(error);
            throw apiError;
        }
    }

    async put<T>(url: string, data: unknown): Promise<any> {
        try {
            const response = await this.axiosInstance.put<ApiResponse<T>>(url, data);
            return response.data;
        } catch (error: any) {
            const apiError: ApiError = this.handleError(error);
            throw apiError;
        }
    }

    private handleError(error: any): ApiError {
        return {
            message: error.response?.data?.message || error.message,
            statusCode: error.response?.status,
        };
    }
}

export const apiService = new ApiService();
export default ApiService
