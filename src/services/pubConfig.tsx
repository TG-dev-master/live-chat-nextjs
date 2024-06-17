import PubNub from "pubnub"

export const createPubNubClient = (userName: string): PubNub => {
  return new PubNub({
    publishKey: process.env.NEXT_PUBLIC_PUBLISH_KEY as string, // Your publish key from environment variables
    subscribeKey: process.env.NEXT_PUBLIC_SUBSCRIBE_KEY as string, // Your subscribe key from environment variables
    uuid: userName || "Default User", // Set the UUID to the provided username or a default value
  })
}
