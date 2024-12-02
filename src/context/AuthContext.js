import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true); // Thêm trạng thái loading

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          setUser(currentUser); // Người dùng đã đăng nhập
        } else {
          setUser(null); // Người dùng đã đăng xuất hoặc không có phiên
        }
        setLoading(false); // Đã hoàn tất kiểm tra trạng thái
      });

      return () => unsubscribe();
   }, []);

   if (loading) {
     // Hiển thị loading hoặc màn hình trống trong khi kiểm tra trạng thái đăng nhập
     return <div>Loading...</div>;
   }

   return (
      <AuthContext.Provider value={{ user,setUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
