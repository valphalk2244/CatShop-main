import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("❌ Please define MONGODB_URI in .env file")
}

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Already connected to MongoDB")
        return
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("🎉 Connected to MongoDB")
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        throw error
    }
}

export default connectToDatabase
