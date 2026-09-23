interface Env {
  KV_CACHE: KVNamespace;
  BACKEND_URL?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  const backend_origin = env.BACKEND_URL;
  const backendURL = `${backend_origin}${url.pathname}${url.search}`;

  if (request.method === "GET") {
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

    const response = await fetch(backendURL, { headers: request.headers });

    if (response.ok) {
      const data = await response.text();
      await env.KV_CACHE.put(cacheKey, data, { expirationTtl: 300 });

      return new Response(data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "X-Cache": "MISS",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    return response;
  } catch {
    return fetch(backendURL, { headers: request.headers });
  }
};
