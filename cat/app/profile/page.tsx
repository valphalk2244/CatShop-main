"use client"; // ต้องมีเพราะใช้ useState และ useEffect

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar"; // ถ้าอยากใช้ Navbar ในหน้า Profile

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true); // สำหรับการโหลดข้อมูล
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบว่า user login หรือไม่จาก localStorage
    const token = localStorage.getItem("token");
    
    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไปยังหน้า login
      router.push("/login");
      return;
    }

    // ถ้ามี token ให้ดึงข้อมูล user
    // นี่คือลักษณะตัวอย่างการดึงข้อมูลจาก localStorage, หรืออาจใช้ API เพื่อดึงข้อมูลจากฐานข้อมูล
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false); // เลิกการโหลดข้อมูล
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // ระหว่างโหลดข้อมูลให้แสดงข้อความ
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <Navbar /> {/* นำ Navbar ไปแสดงที่นี่ */}
      <div className="max-w-4xl mx-auto mt-10 p-4 border rounded bg-white">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
        <button
          onClick={() => router.push("/edit-profile")}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
