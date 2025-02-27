import { connectToDatabase } from "@/lib/mongodb"
import { User } from "../../../model/user"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    await connectToDatabase()

    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        // ตรวจสอบว่า email ถูกใช้ไปแล้วหรือยัง
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" })
        }

        // สร้าง User ใหม่
        const newUser = new User({ username, email, password })
        await newUser.save()

        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
