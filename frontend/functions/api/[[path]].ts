interface Env {
  KV_CACHE: KVNamespace;
  BACKEND_URL?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  console.log("Caching function triggered for:", url.pathname);

  // 1. FIX THE DUPLICATION: Strip out the leading '/api' from the incoming path
  // If url.pathname is "/api/users", cleanPath becomes "/users"
  const cleanPath = url.pathname.replace(/^\/api/, '');
  
  const backend_origin = env.BACKEND_URL ?? "";
  // Combines: "https://" + "/users" + "?query=1"
  const backendURL = `${backend_origin}${cleanPath}${url.search}`;

  // 2. Safely handle Non-GET requests (POST, PUT, DELETE, etc.)
  if (request.method !== "GET") {
    // Only clone/pass the body if the request method allows a body
    const hasBody = ["POST", "PUT", "PATCH"].includes(request.method);
    
    return fetch(backendURL, {
      method: request.method,
      headers: request.headers,
      body: hasBody ? request.body : null,
      // Cloudflare specific optimization to avoid stream locking issues
      redirect: "manual" 
    });
  }

  const cacheKey = `cache:${url.pathname}${url.search}`;

  try {
    // 3. Check KV cache
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

    // 4. Cache Miss: Fetch from Render backend
    const response = await fetch(backendURL, {
      method: "GET",
      headers: request.headers,
    });

    if (response.ok) {
      const data = await response.text();
      
      // 5. OPTIMIZATION: Use waitUntil to make sure the KV write finishes fully 
      // without delaying the response back to the user's browser.
      context.waitUntil(
        env.KV_CACHE.put(cacheKey, data, { expirationTtl: 300 })
      );

      const headers = new Headers(response.headers);
      headers.set("X-Cache", "MISS");
      headers.set("Access-Control-Allow-Origin", "*");

      return new Response(data, {
        status: response.status,
        headers,
      });
    }
    return response;
  } catch (error) {
    console.error("KV or Fetch failed:", error);
    return fetch(backendURL, { method: "GET", headers: request.headers });
  }
};
