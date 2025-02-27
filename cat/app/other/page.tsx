"use client"

import { useSearchParams } from "next/navigation"

const OtherPage = () => {
  const searchParams = useSearchParams()
  const imageUrl = searchParams.get("image")

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="w-full h-auto rounded" />
      ) : (
        <p>No image uploaded.</p>
      )}
    </div>
  )
}

export default OtherPage
