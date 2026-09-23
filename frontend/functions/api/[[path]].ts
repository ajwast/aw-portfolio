interface Env {
  KV_CACHE: KVNamespace;
  BACKEND_URL?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  const cleanPath = url.pathname.replace(/^\/api/, "");
  const backend_origin = env.BACKEND_URL ?? "";
  const backendURL = `${backend_origin}${cleanPath}${url.search}`;

  // HANDLE ADMIN MUTATIONS (POST, PUT, DELETE)
  if (request.method !== "GET") {
    const hasBody = ["POST", "PUT", "PATCH"].includes(request.method);

    const response = await fetch(backendURL, {
      method: request.method,
      headers: request.headers,
      body: hasBody ? request.body : null,
      redirect: "manual",
    });

    // If the Admin's post was successfully created/updated
    if (response.ok) {
      context.waitUntil(
        Promise.all([
          env.KV_CACHE.delete("cache:/api/projects"),
          env.KV_CACHE.delete("cache:/api/posts"),
        ]),
      );
      console.log("Admin action detected. Caches purged.");
    }

    return response;
  }

  // HANDLE GET REQUESTS (PUBLIC BLOG READS)
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

      context.waitUntil(
        env.KV_CACHE.put(cacheKey, data, { expirationTtl: 10518984 }),
      );

      const headers = new Headers(response.headers);
      headers.set("X-Cache", "MISS");
      headers.set("Access-Control-Allow-Origin", "*");

      return new Response(data, { status: response.status, headers });
    }
    return response;
  } catch {
    return fetch(backendURL, { method: "GET", headers: request.headers });
  }
};
