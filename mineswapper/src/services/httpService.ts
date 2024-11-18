export type HttpMethod =
  | "GET"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

// export enum HttpMethod {
//   Get,
//   Post,
//   Put,
//   Delete,
//   Patch,
//   Options,
// }

const BASE_URL: string = "";

//Return type?
//With init value?
//TODO: Rewrite the services
export async function call<ApiRequest, ApiResponse>(
  method: HttpMethod,
  url: string,
  body: ApiRequest | null = null,
  secured: boolean = true
): Promise<ApiResponse | null> {
  let response: ApiResponse | null = null;

  try {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (secured) {
      let token = localStorage.getItem("token");

      if (token === null) {
        throw new Error("The authentication token is null");
      }

      headers.append("Authorization", `Bearer ${token}`);
    }

    //body?
    const apiResponse = await fetch(`${BASE_URL}/${url}`, {
      method: method,
      headers: headers,
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
