import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: null }, // ✅ เพิ่ม field image
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model("Post", PostSchema)
