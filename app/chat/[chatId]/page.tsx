"use client"
import React from "react"

import { useParams, useSearchParams } from "next/navigation"

import ChatModule from "../../../src/components/chat/Chat"

const Chat: React.FC = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const { chatId } = params // Extract the chatId from the route parameters
  const userName = searchParams.get("userName") // Get the userName from the search parameters

  return (
    <div>
      {/* Render the ChatModule component, passing the chatId and userName as props */}
      <ChatModule chatId={chatId} userName={userName} />
    </div>
  )
}

export default Chat
