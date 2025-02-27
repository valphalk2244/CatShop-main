"use client"; // ต้องมีเพราะใช้ useState และ useEffect

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path); // ใช้ router เพื่อไปยังหน้าที่ต้องการ
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed top-0 left-0">
      <h1 className="text-2xl font-bold mb-6">My App</h1>
      <ul>
        <li
          className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => handleNavigate("/profile")}
        >
          Profile
        </li>
        <li
          className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => handleNavigate("/post")}
        >
          Post
        </li>
        <li
          className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => handleNavigate("/other")}
        >
          Other Page
        </li>
      </ul>
    </div>
  );
};

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // ⭐ เช็คว่ามี token มั้ย
    if (token) {
      setUser({ name: "User" }); // สมมติว่ามีผู้ใช้ล็อกอิน
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token
    setUser(null); // อัปเดต state
    router.push("/"); // Redirect ไปหน้า Login
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <h1 className="text-xl">😻Cat Shop😻</h1>
      <div>
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ) : (
          <>
            <a href="/login" className="mr-4">Login</a>
            <a href="/register" className="bg-blue-500 px-4 py-2 rounded">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar /> {/* ใส่ Sidebar ไว้ทางซ้าย */}
      <div className="flex-1 p-6 ml-64">
        <Navbar /> {/* ใส่ Navbar ไว้ที่ด้านบน */}
        {children} {/* เนื้อหาหลักที่จะแสดงผล */}
      </div>
    </div>
  );
};

export default Layout;
