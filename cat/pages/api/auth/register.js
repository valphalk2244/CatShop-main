import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    await connectToDatabase()

    const { username, email, password, gender } = req.body
    if (!username || !email || !password || !gender) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // ตรวจสอบว่า gender อยู่ในค่า ["male", "female", "other"] หรือไม่
    const validGenders = ["male", "female", "other"]
    if (!validGenders.includes(gender)) {
        return res.status(400).json({ message: "Invalid gender" })
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" })
        }

        const newUser = new User({ username, email, password, gender })
        await newUser.save()

        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
