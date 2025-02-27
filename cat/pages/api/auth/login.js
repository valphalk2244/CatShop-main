import bcrypt from "bcryptjs" // สำหรับการเข้ารหัสรหัสผ่าน
import jwt from "jsonwebtoken" // สำหรับสร้าง token
import User from "@/models/User" // สมมติว่าโมเดลผู้ใช้มีข้อมูล Username, Email, และ Password

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    const { usernameOrEmail, password } = req.body

    // ตรวจสอบว่าเป็น Email หรือ Username โดยใช้ Regular Expression
    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail) // เช็คว่าเป็น email หรือไม่

    let user
    if (isEmail) {
        // ถ้าเป็น Email ค้นหาผู้ใช้จาก Email
        user = await User.findOne({ email: usernameOrEmail })
    } else {
        // ถ้าเป็น Username ค้นหาผู้ใช้จาก Username
        user = await User.findOne({ username: usernameOrEmail })
    }

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    // สร้าง JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" })

    return res.status(200).json({ token })
}
