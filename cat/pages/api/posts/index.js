import { connectToDatabase } from "@/lib/mongodb"
import Post from "../../../model/Post"

export default async function handler(req, res) {
    try {
        await connectToDatabase()

        if (req.method === "GET") {
            const posts = await Post.find()
            return res.status(200).json(posts)
        }

        if (req.method === "POST") {
            const { title, content } = req.body
            const newPost = new Post({ title, content })
            await newPost.save()
            return res.status(201).json(newPost)
        }

        return res.status(405).json({ message: "Method Not Allowed" })
    } catch (error) {
        console.error("Error occurred:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
