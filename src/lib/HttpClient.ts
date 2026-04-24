import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'

export interface ApiError {
  status: number
  message: string
  code?: string
}

export class HttpClient {
  protected readonly http: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.http = axios.create({
      baseURL,
      timeout: 15_000,
      headers: { 'Content-Type': 'application/json' },
      ...config,
    })

    this.registerRequestInterceptor()
    this.registerResponseInterceptor()
  }

  // ── Interceptors ──────────────────────────────────────────
  private registerRequestInterceptor() {
    this.http.interceptors.request.use((config) => {
      // Pull token from a store or localStorage — avoid coupling to Pinia here
      const token = localStorage.getItem('access_token')
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })
  }

  private registerResponseInterceptor() {
    this.http.interceptors.response.use(
      (res: AxiosResponse) => res,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // ── Token refresh logic (or redirect to login) ──
          // You could emit a global event here instead of routing directly,
          // keeping this class framework-agnostic.
          window.dispatchEvent(new CustomEvent('auth:unauthorized'))
        }
        // Normalize error shape before it propagates
        return Promise.reject(this.normalizeError(error))
      }
    )
  }

  // Convert Axios errors into a predictable ApiError shape
  private normalizeError(error: AxiosError): ApiError {
    const data = error.response?.data as Record<string, unknown> | undefined
    return {
      status: error.response?.status ?? 0,
      message: (data?.message as string) ?? error.message,
      code: (data?.code as string) ?? 'UNKNOWN_ERROR',
    }
  }
}
