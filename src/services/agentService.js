// import { getXSRFToken } from "./authService";

import { authClient, getCookie } from "../lib/axiosClient";

export const getAgents = async () => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    authClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await authClient.get("/api/agents");
  return data;
};
