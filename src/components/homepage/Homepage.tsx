"use client"

import React, { useState } from "react"

import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

const Homepage: React.FC = () => {
  const router = useRouter()
  const [joinChatId, setJoinChatId] = useState("")
  const [username, setUsername] = useState("")
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleCreateChat = () => {
    // Function to handle creating a new chat
    const chatId = uuidv4() as string // Generate a new UUID as chatId
    router.push(`/chat/${chatId}?userName=${username}`) // Navigate to chat page with generated chatId and username
  }

  const handleJoinChat = () => {
    // Function to handle joining an existing chat
    if (joinChatId.trim() !== "") {
      router.push(`/chat/${joinChatId}?userName=${username}`) // Navigate to chat page with provided chatId and username
    }
  }

  const handleValidateUsername = () => {
    const isValid = /^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username) // Check if username starts with a letter and is followed by alphanumeric characters, with at least 4 characters in total
    if (!isValid) {
      setErrorMessage(
        "Username must start with a letter and be at least 4 characters long with only alphanumeric characters.",
      ) // Set error message
      setIsUsernameValid(false)
    } else {
      setErrorMessage("")
      setIsUsernameValid(true)
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center  bg-gray-100'>
      <div className='ctm-form  m-2.5 bg-slate-200 p-6 md:m-0 md:p-10'>
        <h1 className='mb-6 text-center text-2xl font-bold text-slate-600 md:mb-8 md:text-3xl'>
          {`Welcome, ${isUsernameValid ? username : ""} to the Chat App!`}
        </h1>
        {isUsernameValid ? (
          <>
            <div className='mb-6 flex flex-col items-center justify-center md:mb-8'>
              <div className='mb-3 text-lg font-semibold text-slate-500 md:text-xl'>
                Start a new chat
              </div>
              <button
                onClick={handleCreateChat}
                className='create-btn mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                Create Chat
              </button>
            </div>
            <div className='mb-3 text-center text-lg font-semibold text-slate-500 md:text-xl'>
              Join an existing chat with the code
            </div>
            <div className='join-input flex w-full  flex-col items-center justify-center '>
              <input
                type='text'
                placeholder='Enter chat ID'
                value={joinChatId}
                onChange={(e) => setJoinChatId(e.target.value)}
                className='mb-4 w-full rounded border px-4 py-2 sm:w-64'
              />
              <button
                onClick={handleJoinChat}
                className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
              >
                Join Chat
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col items-center justify-center'>
              <input
                type='text'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setErrorMessage("")
                }}
                className='mb-4 w-full rounded border px-4 py-2 sm:w-64'
              />
              {errorMessage && (
                <div className='mb-4 text-sm text-red-500'>{errorMessage}</div>
              )}
              <button
                onClick={handleValidateUsername}
                className='rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Homepage
