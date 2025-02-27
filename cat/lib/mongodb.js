// import mongoose from "mongoose"

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//     throw new Error("⚠️ Please define MONGODB_URI in .env")
// }

// let cached = global.mongoose || { conn: null, promise: null }

// async function connectToDatabase() {
//     if (cached.conn) {
//         console.log("✅ Already connected to MongoDB")
//         return cached.conn
//     }

//     if (!cached.promise) {
//         console.log("⏳ Connecting to MongoDB...")
//         cached.promise = mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }).then((mongoose) => {
//             console.log("✅ Connected to MongoDB successfully!")
//             return mongoose
//         }).catch((error) => {
//             console.error("❌ MongoDB connection error:", error)
//             process.exit(1)
//         })
//     }

//     cached.conn = await cached.promise
//     return cached.conn
// }

// export default connectToDatabase

import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

export async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("MongoDB connection error:", error)
        throw new Error("Failed to connect to MongoDB")
    }
}

export default connectToDatabase

