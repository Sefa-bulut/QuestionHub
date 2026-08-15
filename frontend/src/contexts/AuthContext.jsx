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
    const { accessToken, userId, userName } = authResponseData;

    // Kullanıcı bilgilerini frontend'de kullanmak üzere bir objede topluyoruz
    const userData = {
      userId: userId,
      userName: userName,
    };

    // Verileri tarayıcı hafızasına (localStorage) kaydediyoruz
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    // React state'lerini güncelliyoruz
    setToken(accessToken);
    setUser(userData);
  };

  // 3. Çıkış yapıldığında her şeyi temizle
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token, // Token varsa true, yoksa false döner
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
