"use client"; // ต้องมีเพราะใช้ useState และ useEffect

import { useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  
  const handleNavigate = (path) => {
    router.push(path); // ใช้ router เพื่อไปยังหน้าที่ต้องการ
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4">
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
          onClick={() => handleNavigate("/other-page")}
        >
          Other Page
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
