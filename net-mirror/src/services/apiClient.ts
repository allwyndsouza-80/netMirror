import { API_TIMEOUT } from "../shared/utils/constant";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
  timeout?: number; // optional override
}

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { params, timeout = API_TIMEOUT, ...fetchOptions } = options;

  const url = new URL(`${BASE_URL}${endpoint}`);

  // attach query params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      signal: controller.signal, //attach signal
      ...fetchOptions,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.status_message || "API Error");
    }

    return res.json();
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(id); //cleanup
  }
};