// import { getXSRFToken } from "./authService";

import { authClient, gatewayClient, getCookie } from "../lib/axiosClient";

export const getAgents = async () => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await gatewayClient.get("/agents");
  return data;
};
