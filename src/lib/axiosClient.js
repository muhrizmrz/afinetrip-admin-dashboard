import axios from "axios";

const baseURLs = {
  auth: import.meta.env.VITE_AUTH_API_URL,
  booking: import.meta.env.VITE_BOOKING_API_URL,
  search: import.meta.env.VITE_SEARCH_API_URL,
  gateway: import.meta.env.VITE_GATEWAY_API_URL,
};

export const createAxiosClient = (service) => {
  const instance = axios.create({
    baseURL: `${baseURLs[service]}${service !== "auth" ? "/api" : ""}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-App-Client": "admin",
    },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN", // 👈 tell axios which cookie to use
    xsrfHeaderName: "X-XSRF-TOKEN", // 👈 Laravel expects this header
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 419) {
        console.warn("⚠️ CSRF mismatch (419) — probably missing XSRF header.");
      }

      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";

      // Toast the error message (assuming you're using a toast library)
      // Example with vue-toast or similar:
      // useToast().error(errorMessage);

      console.error("❌ API Error:", errorMessage);
      return Promise.reject(error);
    }
  );

  console.log(
    `✅ ${service} Axios client created with baseURL:`,
    instance.defaults.baseURL
  );

  return instance;
};

export const authClient = createAxiosClient("auth");
export const gatewayClient = createAxiosClient("gateway");
export const bookingClient = createAxiosClient("booking");
export const searchClient = createAxiosClient("search");

export const initSanctum = async (service = "gateway") => {
  await axios.get(`${baseURLs[service]}/sanctum/csrf-cookie`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-App-Client": "admin",
    },
  });
};

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return decodeURIComponent(match[2]);
  return null;
};
