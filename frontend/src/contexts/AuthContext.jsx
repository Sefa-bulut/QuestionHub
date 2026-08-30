import api from "@/services/api";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1. Sayfa yenilendiğinde (F5) verilerin kaybolmaması için state'leri localStorage'dan başlatıyoruz
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Login fonksiyonumuz artık doğrudan backend'den dönen AuthResponse objesini (data) alacak
  const login = (authResponseData) => {
    // Backend'den gelen DTO alanlarını parçalıyoruz (Destructuring)
    const { accessToken, refreshToken, userId, avatarId, userName, about } =
      authResponseData;

    // Kullanıcı bilgilerini frontend'de kullanmak üzere bir objede topluyoruz
    const userData = {
      userId: userId,
      avatarId: avatarId,
      userName: userName,
      about: about,
    };

    // Verileri tarayıcı hafızasına (localStorage) kaydediyoruz

    //Access token
    localStorage.setItem("token", accessToken);

    //Refresh token
    localStorage.setItem("refreshToken", refreshToken);

    localStorage.setItem("user", JSON.stringify(userData));

    // React state'lerini güncelliyoruz
    setToken(accessToken);
    setUser(userData);
  };

  // 3. Çıkış yapıldığında her şeyi temizle
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await api.post("/auth/logout", { refreshToken });
    } catch (error) {
      console.log("Logout API hatası:", error.response?.data);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  //User ile ilgili bir güncelleme sonrası uygulamayı senkronize tutan fonksiyon
  const updateUser = (updatedFields) => {
    if (!user) return;

    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token, // Token varsa true, yoksa false döner
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
