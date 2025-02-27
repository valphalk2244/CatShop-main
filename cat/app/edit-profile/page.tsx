"use client"; // ต้องมีเพราะใช้ useState และ useEffect

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
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
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser) {
      setUser(storedUser);
      setNewName(storedUser.name); // เซ็ตค่าเริ่มต้นของชื่อ
      setNewEmail(storedUser.email); // เซ็ตค่าเริ่มต้นของอีเมล
    }
  }, [router]);

  const handleSave = () => {
    if (!newName || !newEmail) {
      setError("Please fill in all the fields");
      return;
    }

    // สมมติว่าทำการบันทึกข้อมูลลง localStorage
    const updatedUser = { name: newName, email: newEmail };

    // ในกรณีที่มีการเปลี่ยนรหัสผ่าน ก็สามารถเพิ่ม logic ได้ที่นี่
    if (newPassword) {
      updatedUser["password"] = newPassword;
    }

    localStorage.setItem("user", JSON.stringify(updatedUser)); // บันทึกข้อมูลใหม่ลง localStorage
    setUser(updatedUser);
    setError(""); // ลบข้อความผิดพลาด

    // สามารถส่งข้อมูลไปยัง API เพื่ออัปเดตข้อมูลในฐานข้อมูลจริง ๆ ได้ที่นี่

    router.push("/profile"); // ไปที่หน้าโปรไฟล์หลังจากบันทึกข้อมูล
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        <div className="flex justify-between">
          <label className="font-bold">Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex justify-between">
          <label className="font-bold">Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex justify-between">
          <label className="font-bold">New Password (optional):</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter new password"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
