import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    await connectToDatabase()

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }

    try {
        // ค้นหา User ใน Database
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // ตรวจสอบ Password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // สร้าง JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
