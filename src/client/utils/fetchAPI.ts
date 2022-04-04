// import jsonParseSafe from "../utils/jsonParseSafe";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

export default async (route: string, method: HTTPMethod = "GET", body?: any) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    
    const options: { headers: HeadersInit, method: HTTPMethod, body?: any } = {
        headers,
        method
    };

    if(body) options.body = JSON.stringify(body);

    const res = await fetch(`${window.location.origin}/api/${route}`, options),
        json = await res.json();
    
    if(json.status < 200 || json.status >= 300) throw new Error(`${json.status}. Unable to fetch.`)

    return json
}