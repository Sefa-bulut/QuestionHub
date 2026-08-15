import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// 1. REQUEST INTERCEPTOR: İstek atılmadan hemen önce çalışır
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Eğer localStorage'da token varsa Authorization header'ına Bearer olarak ekler
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. RESPONSE INTERCEPTOR: Yanıt geldikten hemen sonra çalışır
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Backend'den 401 Unauthorized geldiyse (Token süresi dolmuş veya geçersiz)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Kullanıcıyı oturum açma sayfasına yönlendir
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
