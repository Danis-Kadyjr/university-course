import { onRequest as handleLead } from "../functions/api/lead.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/lead" || url.pathname === "/api/lead/") {
      return handleLead({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
