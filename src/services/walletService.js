// import { getXSRFToken } from "./authService";

import { authClient, gatewayClient, getCookie } from "../lib/axiosClient";

export const getMainBalance = async () => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await gatewayClient.get("/wallet/admin/balance");
  return data;
};

export const topUp = async (amount) => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await gatewayClient.post("/wallet/top-up", amount);
  return data;
}

export const getTopUpHistory = async (amount) => {
  const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const { data } = await gatewayClient.get("/wallet/topup-history");
  return data;
}

export const updateAgentCredit = async (data) => {
    const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const response = await gatewayClient.post(`/wallet/transfer-to-agent`, data);
  return response.data;
};

export const deductCreditFromAgent = async (data) => {
    const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const response = await gatewayClient.post(`/wallet/deduct-from-agent`, data);
  return response.data;
};


export const getTransactionByAgent = async (wallet_id) => {
    const xsrf = getCookie("XSRF-TOKEN");
  if (xsrf) {
    gatewayClient.defaults.headers.common["X-XSRF-TOKEN"] = xsrf;
  } else {
    console.warn("XSRF-TOKEN cookie not found in document.cookie");
  }
  const response = await gatewayClient.get(`/wallet/transactions/by-wallet/` + wallet_id);
  return response.data;
};