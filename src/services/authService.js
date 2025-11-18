import { authClient, gatewayClient, getCookie, initSanctum } from "../lib/axiosClient";
 
export const login = async (email, password) => {
  await initSanctum();
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    authClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }

  // Step 3 - now call login
  const res = await authClient.post("/api/login", { email, password, role: "admin" });
  return res.data;
};

export const setXSRFToken = () => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    authClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  return xsrf;  
}

export const logout = async () => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    authClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  
  await authClient.post("/api/logout");
};

export const getCurrentUser = async () => {
  const { data } = await gatewayClient.get("/gateway/me");
  return data;
};

export const createAgent = async (agentData) => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    authClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await authClient.post("/api/agents", agentData);
  return data;
}
