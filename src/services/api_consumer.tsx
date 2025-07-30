/* eslint-disable react-refresh/only-export-components */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

// Definir la URL base de la API
const baseURL = "http://localhost:5000/api/v1/";

// Definir la estructura de una respuesta exitosa
interface ApiResponse<T = any> {
    data: T;
    status: boolean;
    statusText: string;
}

interface ErrorResponse {
    [key: string]: any;
}

// Función para realizar solicitudes con token de autorización
async function api<T = any>(
    url: string,
    method: string,
    data?: any
): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token");
    const config: AxiosRequestConfig = {
        baseURL,
        url,
        method,
        data,
        headers: {
            "Accept-Language": "es",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response: AxiosResponse<T> = await axios(config);
        return validateResponse(response);
    } catch (error) {
        return ValidateError(error as AxiosError);
    }
}

// Función para realizar solicitudes sin token de autorización
async function apiNoToken<T = any>(
    url: string,
    method: string,
    data?: any,
    headers?: Record<string, string>
): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {
        baseURL,
        url,
        method,
        data,
        headers: {
            "Accept-Language": "es",
            ...headers,
        },
    };

    try {
        const response: AxiosResponse<T> = await axios(config);
        return validateResponse(response);
    } catch (error) {
        return ValidateError(error as AxiosError);
    }
}

// Función para validar errores de la API
function ValidateError<T = any>(err: AxiosError, text?: string): ApiResponse<T> {
    const alert = (key: string, element: string | string[]) => {
        toast.error(`${key}: ${Array.isArray(element) ? element.join(", ") : element}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    try {
        const ErrorMsg: ErrorResponse = err.response?.data || {};

        if (text) {
            alert(text, "");
            return { data: {} as T, status: false, statusText: text };
        } else {
            if (err.request?.status === 404) {
                alert(err.request.status.toString(), err.request.statusText);
                return { data: {} as T, status: false, statusText: err.request.statusText };
            }
            if (err.request?.status === 500) {
                alert("500", "Error en el servidor");
                return { data: {} as T, status: false, statusText: "Error en el servidor" };
            }

            // Manejo para diferentes formatos de respuesta de error
            if (typeof ErrorMsg === "string") {
                // Error directo como string
                alert("Error", ErrorMsg);
                return { data: {} as T, status: false, statusText: ErrorMsg };
            } else if (ErrorMsg?.error) {
                // Error en un campo "error"
                alert("Error", ErrorMsg.error);
                return { data: {} as T, status: false, statusText: ErrorMsg.error };
            } else if (typeof ErrorMsg === "object") {
                // Error como objeto con múltiples claves
                for (const key in ErrorMsg) {
                    if (Object.hasOwnProperty.call(ErrorMsg, key)) {
                        const element = ErrorMsg[key];
                        if (Array.isArray(element)) {
                            alert(key, element.join(", "));
                        } else {
                            alert(key, element);
                        }
                    }
                }
                return { data: {} as T, status: false, statusText: "Error en la solicitud" };
            }
        }

        return { data: {} as T, status: false, statusText: "Error desconocido" };
    } catch (error) {
        console.error("Error en ValidateError:", error);
        toast.error("Error desconocido al manejar la solicitud");
        return { data: {} as T, status: false, statusText: "Error desconocido" };
    }
}

// Función para validar la respuesta de la API
function validateResponse<T = any>(response: AxiosResponse<T>): ApiResponse<T> {
    const statusBoolean = response.status >= 200 && response.status < 300;
    return {
        data: response.data,
        status: statusBoolean,
        statusText: response.statusText,
    };
}

// Clase ApiConsumer con tipos
export default class ApiConsumer {
    private url: string;

    constructor({ url }: { url: string }) {
        this.url = url;
    }

    async petition<T = any>(
        body: any,
        type: string,
        headers: Record<string, string> = {}
    ): Promise<ApiResponse<T>> {
        return apiNoToken<T>(this.url, type, body, headers);
    }

    async getAll<T = any>(query?: string): Promise<ApiResponse<T>> {
        return api<T>(`${this.url}${query || ""}`, "GET");
    }

    async getById<T = any>(id: string | number): Promise<ApiResponse<T>> {
        return api<T>(`${this.url}${id}/`, "GET");
    }

    async create<T = any>(body: any): Promise<ApiResponse<T>> {
        return api<T>(`${this.url}`, "POST", body);
    }

    async update<T = any>(body: any, id?: string | number): Promise<ApiResponse<T>> {
        return api<T>(`${this.url}${id || body?.id}/`, "PUT", body);
    }

    async updatePatch<T = any>(
        body: any,
        id?: string | number
    ): Promise<ApiResponse<T>> {
        return api<T>(`${this.url}${id || body?.id}/`, "PATCH", body);
    }

    async delete<T = any>(id: string | number): Promise<ApiResponse<T>> {
        return api<T>(`${this.url}${id}/`, "DELETE");
    }

    async createMultiplatform<T = any>(body: any): Promise<ApiResponse<T>> {
        return api<T>(`${this.url}`, "POST", body);
    }
}