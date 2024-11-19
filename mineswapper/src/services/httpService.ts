export type HttpMethod =
  | "GET"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

const BASE_URL: string | undefined =
  process.env.REACT_APP_MINESWAPPER_SERVER_BASE_URL;

export async function call<ApiRequest, ApiResponse>(
  url: string,
  method: HttpMethod,
  body?: ApiRequest,
  headers: HeadersInit = {}
): Promise<ApiResponse | null> {
  let response: ApiResponse | null = null;

  if (BASE_URL === undefined) {
    throw new Error("The base URL is not specified.");
  }

  try {
    let token = localStorage.getItem("token");

    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const apiResponse = await fetch(`${BASE_URL}${url}`, {
      method: method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!apiResponse.ok) {
      throw new Error(
        `Call to ${url} was failed with status code ${apiResponse.status}`
      );
    }

    response = (await apiResponse.json()) as ApiResponse;
  } catch (error) {
    console.error("Error:", error);
  }

  return response;
}
