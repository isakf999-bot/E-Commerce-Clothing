/**
 * Thin, typed fetch wrapper. Every network call in the app goes through here
 * so error handling, base URL and JSON parsing live in exactly one place.
 * Components never call `fetch` directly — they use the hooks in `src/hooks`,
 * which call the service functions in `services/api/products.ts`.
 */

const BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const url = new URL(path, BASE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    });
  } catch {
    // Network-level failure (offline, DNS, CORS) — normalise to ApiError so
    // callers only ever deal with one error type.
    throw new ApiError('Network request failed. Check your connection.', 0);
  }

  if (!response.ok) {
    throw new ApiError(
      `Request to ${path} failed (${response.status}).`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
