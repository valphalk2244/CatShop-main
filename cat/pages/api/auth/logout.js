export default function handler(req, res) {
    if (req.method === "POST") {
        res.setHeader(
            "Set-Cookie",
            "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
        )
        return res.status(200).json({ message: "Logout successful" })
    }
    return res.status(405).json({ message: "Method Not Allowed" })
}
