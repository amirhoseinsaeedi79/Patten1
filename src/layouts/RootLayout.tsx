import React from "react"
import { Outlet } from "react-router-dom"
import backgroundImg from "@/assets/images/background.jpg"

const RootLayout: React.FC = () => {
  // JUST IN DEVELOPMENT MODE
  const token =
    // "ndjihdbyhshkpxehxaqgplyhpctiwjbnbqaerjetrlemeswythfoscmfvxnmwbqfdksqsksonigjnwnetyhowilvhrcydovc"
    "megxbfqoqumgaalfaxbtefkxlotilqkirewlmfvviagtsxmnysfudybrbplndahrtblsxqvvyjmbhaaobhfkngugweqjyomc"
  localStorage.setItem("token", token)

  return (
    <div
      className="relative flex flex-col items-center bg-gray-100 bg-opacity-35 bg-cover md:bg-center bg-fixed p-2 w-full min-h-screen"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <Outlet />
    </div>
  )
}

export default RootLayout
