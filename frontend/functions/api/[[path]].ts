interface Env {
  KV_CACHE: KVNamespace;
  BACKEND_URL?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  const cleanPath = url.pathname.replace(/^\/api/, '');
  const backend_origin = env.BACKEND_URL ?? "";
  const backendURL = `${backend_origin}${cleanPath}${url.search}`;

  // 1. HANDLE ADMIN MUTATIONS (POST, PUT, DELETE)
  if (request.method !== "GET") {
    const hasBody = ["POST", "PUT", "PATCH"].includes(request.method);
    
    // Forward the creation/edit request to Render
    const response = await fetch(backendURL, {
      method: request.method,
      headers: request.headers,
      body: hasBody ? request.body : null,
      redirect: "manual"
    });

    // If the Admin's post was successfully created/updated on Render...
    if (response.ok) {
      // SECURE EDGE INVALIDATION: Wipe out the main blog lists caches immediately!
      // You can delete specific keys or list and delete them
      context.waitUntil(
        Promise.all([
          env.KV_CACHE.delete("cache:/api/posts"), // Clear the main blog list cache
          env.KV_CACHE.delete(`cache:${url.pathname}`) // Clear this specific post details cache if applicable
        ])
      );
      console.log("Admin action detected. Blog caches purged.");
    }

    return response;
  }

  // 2. HANDLE GET REQUESTS (PUBLIC BLOG READS)
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

    const response = await fetch(backendURL, { method: "GET", headers: request.headers });

    if (response.ok) {
      const data = await response.text();
      
      // Increased TTL to 7 Days (604,800 seconds) since changes are rare
      context.waitUntil(
        env.KV_CACHE.put(cacheKey, data, { expirationTtl: 604800 })
      );

      const headers = new Headers(response.headers);
      headers.set("X-Cache", "MISS");
      headers.set("Access-Control-Allow-Origin", "*");

      return new Response(data, { status: response.status, headers });
    }
    return response;
  } catch (error) {
    return fetch(backendURL, { method: "GET", headers: request.headers });
  }
};
