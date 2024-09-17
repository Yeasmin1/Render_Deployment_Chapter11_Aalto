import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";

// Configure Eta template engine
configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

let visitCount = 0;

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/visits") {
    // Increment visit counter
    visitCount++;
    
    // Render visits page with updated count
    const data = { count: visitCount };
    return new Response(await renderFile("visits.eta", data), responseDetails);

  } else if (url.pathname === "/meaning") {
    // Respond with specific string
    return new Response("Seeking truths beyond meaning of life, you will find 43.", {
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
    });

  } else {
    // Respond with default message for other paths
    return new Response("Nothing here yet.", {
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
    });
  }
};

// Start server on port 7777
serve(handleRequest, { port: 7777 });
