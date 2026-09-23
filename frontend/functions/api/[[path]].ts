interface Env {
  KV_CACHE: KVNamespace;
  BACKEND_URL?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  console.log("Caching function");
  const backend_origin = env.BACKEND_URL ?? "";
  const backendURL = `${backend_origin}${url.pathname}${url.search}`;

  // Non-GET requests should bypass cache and be forwarded directly to the backend
  if (request.method !== "GET") {
    return fetch(backendURL, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  const cacheKey = `cache:${url.pathname}${url.search}`;

  try {
    const cachedRes = await env.KV_CACHE.get(cacheKey);

    if (cachedRes) {
      return new Response(cachedRes, {
        headers: {
          "Content-Type": "application/json",
          "X-Cache": "HIT",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const response = await fetch(backendURL, {
      method: "GET",
      headers: request.headers,
    });

    if (response.ok) {
      const data = await response.text();
      await env.KV_CACHE.put(cacheKey, data, { expirationTtl: 300 });

      const headers = new Headers(response.headers);
      headers.set("X-Cache", "MISS");
      headers.set("Access-Control-Allow-Origin", "*");

      return new Response(data, {
        status: response.status,
        headers,
      });
    }
    return response;
  } catch {
    return fetch(backendURL, { method: "GET", headers: request.headers });
  }
};

