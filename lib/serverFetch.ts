import { getCookie } from "@/services/auth/tokenHandler";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetchHelper = async (
  endPoint: string,
  options: RequestInit
) => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  const response = await fetch(`${SERVER_URL}${endPoint}`, {
    credentials: "include",
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      ...headers,
    },
    ...restOptions,
  });

  return response;
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
