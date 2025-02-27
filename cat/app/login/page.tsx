"use client"; // ต้องมีเพราะใช้ useState และ useEffect

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar"; // นำเข้า Navbar

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // เปลี่ยนชื่อเป็น usernameOrEmail
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token); // เก็บ token ใน LocalStorage
      router.push("/"); // เปลี่ยนเส้นทางไปหน้าแรก
    } else {
      setError(data.message); // แสดงข้อผิดพลาด
    }
  };

  return (
    <div>
      <Navbar /> {/* ใส่ Navbar ที่นี่ */}
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email" // ฟิลด์เดียวสำหรับทั้ง Username หรือ Email
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
