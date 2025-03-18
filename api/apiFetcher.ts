import cookies from 'js-cookie';

export class ApiFetcher {
  private static defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  private static async getToken(): Promise<string | undefined> {
    return cookies.get('__session');
  }

  private static async getHeaders(secure: boolean = true): Promise<HeadersInit> {
    const headers = { ...this.defaultHeaders };

    if (secure) {
      const accessToken = await this.getToken();
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    headers['Access-Control-Allow-Origin'] = '*';

    return headers;
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  private static handleError(error: unknown): void {
    console.error('API Error:', error);
  }

  static async get<T>(path: string, secure: boolean = true): Promise<T | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/v1'}${path}`, {
        method: 'GET',
        headers: await this.getHeaders(secure),
        credentials: secure ? 'include' : 'same-origin',
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  static async post<T>(path: string, data: unknown, secure: boolean = true): Promise<T | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/v1'}${path}`, {
        method: 'POST',
        headers: await this.getHeaders(secure),
        credentials: secure ? 'include' : 'same-origin',
        body: JSON.stringify(data),
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  static async delete<T>(path: string, secure: boolean = true): Promise<T | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/v1'}${path}`, {
        method: 'DELETE',
        headers: await this.getHeaders(secure),
        credentials: secure ? 'include' : 'same-origin',
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  static async patch<T>(path: string, data: unknown, secure: boolean = true): Promise<T | undefined> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/v1'}${path}`, {
        method: 'PATCH',
        headers: await this.getHeaders(secure),
        credentials: secure ? 'include' : 'same-origin',
        body: JSON.stringify(data),
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}