interface ApiResponse<T> {
    data: T;
    message?: string;
}

interface ApiError {
    message: string;
    statusCode?: number;
}

// ApiService.ts
import axios, { AxiosInstance } from 'axios';

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
            const apiError: ApiError = {
                message: error.response?.data?.message || error.message,
                statusCode: error.response?.status,
            };
            throw apiError;
        }
    }

    async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
        try {
            const response = await this.axiosInstance.post<ApiResponse<T>>(url, data);
            return response.data;
        } catch (error: any) {
            const apiError: ApiError = {
                message: error.response?.data?.message || error.message,
                statusCode: error.response?.status,
            };
            throw apiError;
        }
    }
}

export const apiService = new ApiService();
