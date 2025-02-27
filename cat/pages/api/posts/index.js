import fs from "fs"
import path from "path"
import { IncomingForm } from "formidable"
import connectToDatabase from "@/lib/mongodb"
import Post from "@/models/Post"

export const config = {
    api: {
        bodyParser: false, // ❌ ปิด bodyParser เพราะใช้ FormData
    },
}

export default async function handler(req, res) {
    console.log("📌 API Called:", req.method)

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    try {
        await connectToDatabase()
        console.log("✅ Connected to Database")

        const form = new IncomingForm({
            multiples: false,
            uploadDir: path.join(process.cwd(), "public/uploads"),
            keepExtensions: true,
        })

        console.log("📌 Parsing Form Data...")

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("❌ Error parsing form:", err)
                return res.status(500).json({ message: "Error parsing form", error: err.message })
            }

            console.log("✅ Form Data Parsed:", fields, files)

            const { title, description, price } = fields
            if (!title || !description || !price) {
                console.error("❌ Missing title, description, or price")
                return res.status(400).json({ message: "All fields are required" })
            }

            let imageUrl = null
            if (files.image) {
                const file = files.image[0]
                const newFilePath = path.join("public/uploads", file.newFilename)
                console.log("📌 Saving file to:", newFilePath)

                fs.renameSync(file.filepath, newFilePath)
                imageUrl = `/uploads/${file.newFilename}`
            }

            console.log("✅ Image URL:", imageUrl)

            const newPost = new Post({
                title: title[0],
                description: description[0],
                price: parseFloat(price[0]),
                image: imageUrl
            })

            await newPost.save()
            console.log("✅ Post saved:", newPost)

            return res.status(201).json(newPost)
        })
    } catch (error) {
        console.error("🔥 API Error:", error)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
