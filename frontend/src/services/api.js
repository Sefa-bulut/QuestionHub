import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const refreshApi = axios.create({
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
  async (error) => {
    const originalRequest = error.config;
    // Backend'den 401 Unauthorized geldiyse (Token süresi dolmuş veya geçersiz)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("Refresh token bulunamadı");
        }

        // Refresh token ile yeni access token almak için API call yapıyoruz
        const response = await refreshApi.post("/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        // Yeni token'ı kaydet
        localStorage.setItem("token", newAccessToken);

        // Orijinal isteğin Authorization header'ını güncelle
        originalRequest.headers.Authorization = newAccessToken;

        // Orijinal isteği tekrar gönder
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token da geçersizse logout
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Kullanıcıyı oturum açma sayfasına yönlendir
        window.location.href = "/login?sessionExpired=true";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
