// import { getXSRFToken } from "./authService";

import { authClient, gatewayClient, getCookie } from "../lib/axiosClient";

export const createAgent = async (agentData) => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await gatewayClient.post("/agents", agentData);
  return data;
}

export const updateAgent = async (id, agentData) => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await gatewayClient.put("/agents/" + id, agentData);
  return data;
}

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

export const getAgent = async (id) => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await gatewayClient.get("/agents/" + id);
  return data.agent;
};
