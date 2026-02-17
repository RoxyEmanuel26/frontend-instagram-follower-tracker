import type { ApiResponse } from "@/types";

const BASE_URL = "/api/v1";

class ApiClient {
    private accessToken: string | null = null;

    setAccessToken(token: string | null) {
        this.accessToken = token;
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${BASE_URL}${endpoint}`;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(options.headers as Record<string, string>),
        };

        if (this.accessToken) {
            headers["Authorization"] = `Bearer ${this.accessToken}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: "include",
        });

        const data: ApiResponse<T> = await response.json();

        // Handle 401 - try refreshing
        if (response.status === 401 && !endpoint.includes("/refresh-token")) {
            const refreshed = await this.refreshToken();
            if (refreshed) {
                headers["Authorization"] = `Bearer ${this.accessToken}`;
                const retryResponse = await fetch(url, {
                    ...options,
                    headers,
                    credentials: "include",
                });
                return retryResponse.json();
            }
        }

        if (!data.success && data.error) {
            throw new ApiRequestError(
                data.error.message,
                data.error.code,
                response.status,
                data.error.details
            );
        }

        return data;
    }

    private async refreshToken(): Promise<boolean> {
        try {
            const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data: ApiResponse<{ accessToken: string }> = await response.json();
            if (data.success && data.data?.accessToken) {
                this.accessToken = data.data.accessToken;
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "GET" });
    }

    async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
}

export class ApiRequestError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number,
        public details?: unknown
    ) {
        super(message);
        this.name = "ApiRequestError";
    }
}

export const api = new ApiClient();
