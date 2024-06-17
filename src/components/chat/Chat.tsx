"use client"

import React, { useEffect, useState } from "react"

import emojiData from "@emoji-mart/data"
import EmojiPicker from "@emoji-mart/react"
import {
  Chat,
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@pubnub/react-chat-components"
import { useRouter } from "next/navigation"
import PubNub from "pubnub"
import { PubNubProvider } from "pubnub-react"

import { createPubNubClient } from "../../services/pubConfig"

const theme = "light"

const ChatModule: React.FC = ({
  chatId,
  userName,
}: {
  chatId: string
  userName: string
}) => {
  const router = useRouter()

  const [pubnub, setPubnub] = useState<PubNub | null>(null)
  const [copied, setCopied] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [file, setFile] = useState<File | null>(null) // State to handle file

  useEffect(() => {
    // Effect to initialize PubNub client when userName changes
    if (!userName) {
      router.push(`/`) // Redirect to home page if userName is not provided
    }

    const pubnubClient = createPubNubClient(userName) as PubNub
    setPubnub(pubnubClient) // Set PubNub client instance

    return () => {
      pubnubClient.unsubscribeAll() // Clean up by unsubscribing from all channels when component unmounts
    }
  }, [userName, router])

  if (!pubnub) return null // If PubNub client is not initialized yet, render nothing

  const handleCopy = () => {
    // Function to handle copying chatId to clipboard
    if (chatId) {
      navigator.clipboard.writeText(chatId).then(() => {
        setCopied(true) // Set copied state to true after successful copy
      })
    }
  }

  const handleTyping = () => {
    // Function to send typing indicator to the channel
    pubnub?.signal({
      channel: chatId,
      message: { type: "typing", user: userName }, // Include user information in typing indicator
    })
  }

  const handleStopTyping = () => {
    // Function to handle stopping typing indicator
    setIsTyping(false) // Set isTyping state to false when user stops typing
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Function to handle file selection
    if (event.target.files?.length) {
      setFile(event.target.files[0]) // Set selected file to state
    }
  }

  const handleSendFile = () => {
    // Function to handle sending selected file
    if (file && pubnub) {
      const reader = new FileReader()
      reader.onload = () => {
        const fileContent = reader.result as string // Read file content as base64 encoded string
        pubnub.publish({
          channel: chatId,
          message: {
            type: "file",
            fileName: file.name,
            fileContent,
          }, // Publish file message to the channel
        })
      }
      reader.readAsDataURL(file) // Read selected file as data URL
    }
  }
  return (
    <PubNubProvider client={pubnub}>
      {/* Chat header section */}
      <div className='w-full bg-[#f0f3f7] p-4 md:flex md:items-center md:justify-between'>
        <div className='mb-3 flex items-center md:mb-0'>
          <div className='h-10 w-10 rounded-full bg-slate-400 '>
            <p className='bg-custom-1100 flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold uppercase text-white'>
              {userName ? userName.slice(0, 2) : "D"}
            </p>
          </div>
          <div>
            <h1 className='ml-4 text-2xl font-bold capitalize'>
              {userName || "Default User"}
            </h1>
          </div>
        </div>
        <div className='flex items-center'>
          <div>
            <p className='text-base font-semibold'>Chat Id:</p>
          </div>
          {chatId && (
            <div className='flex items-center'>
              <p className='ml-1 max-w-[160px] truncate text-base font-normal sm:max-w-[300px]'>
                {chatId}
              </p>
              <button
                onClick={handleCopy}
                className='copy-btn ml-5 inline-block cursor-pointer rounded-[50px] border-0 px-4 py-2 text-sm font-semibold text-[#487a4c] outline-0'
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='custom-chat'>
        {/* Chat messages and input section */}
        <Chat currentChannel={chatId} theme={theme}>
          {/* Message list with custom message and file renderers */}
          <MessageList
            enableReactions
            reactionsPicker={<EmojiPicker data={emojiData} />}
            className='flex-1 overflow-y-auto'
            bubbleRenderer={(message) => {
              const isMyMessage = message.message.publisher === userName
              return (
                <div
                  key={message.message.timetoken}
                  className={`message-display ${
                    isMyMessage ? "my-message" : "other-message"
                  }`}
                >
                  <p className='message-content'>
                    {message.message.message.text}
                  </p>
                </div>
              )
            }}
            fileRenderer={(file) => {
              return (
                <div className='image-message'>
                  <img
                    src={file.url}
                    alt={file.name}
                    className='image-preview'
                  />
                </div>
              )
            }}
          />

          {/* Typing indicator component */}
          <div className='fixed bottom-14'>
            <TypingIndicator />
          </div>

          {/* Message input section with emoji picker and file upload */}
          <MessageInput
            typingIndicator
            placeholder={"Type your message.."}
            emojiPicker={<EmojiPicker data={emojiData} />}
            className=''
            onInput={handleTyping}
            onBlur={handleStopTyping}
            fileUpload='image'
            extraActions={
              <div>
                <input type='file' onChange={handleFileChange} />
                <button onClick={handleSendFile}>Send File</button>
              </div>
            }
          />
        </Chat>
      </div>
    </PubNubProvider>
  )
}

export default ChatModule
