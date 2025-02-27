import { connectToDatabase } from "@/lib/mongodb"
import Post from "../../../models/Post"
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

    if (req.method === "GET") {
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

    else if (req.method === "PUT") {
        try {
            const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found" })
            }
            return res.status(200).json(updatedPost)
        } catch (error) {
            return res.status(500).json({ message: "Failed to update post", error: error.message })
        }
    }

    else if (req.method === "DELETE") {
        try {
            const deletedPost = await Post.findByIdAndDelete(id)
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" })
            }
            return res.status(200).json({ message: "Post deleted successfully" })
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete post", error: error.message })
        }
    }

    else {
        return res.status(405).json({ message: "Method Not Allowed" })
    }
}

function validateObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}
