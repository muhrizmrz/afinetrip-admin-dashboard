import { authClient, gatewayClient, getCookie, initSanctum } from "../lib/axiosClient";
 
export const login = async (email, password) => {
  await initSanctum();
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }

  // Step 3 - now call login
  const res = await gatewayClient.post("/login", { email, password, role: "admin" });
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
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  
  await gatewayClient.post("/logout");
};

export const getCurrentUser = async () => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    authClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  
  
  const { data } = await gatewayClient.get("/user");
  return data;
};

