import { connectToDatabase } from "@/lib/mongodb"
import Post from "../../../model/Post"
import mongoose from "mongoose"

export default async function handler(req, res) {
    try {
        await connectToDatabase()
    } catch (error) {
        return res.status(500).json({ message: "Database connection failed", error: error.message })
    }

    const { id } = req.query

    if (!validateObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format" })
    }

    try {
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

function validateObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}
