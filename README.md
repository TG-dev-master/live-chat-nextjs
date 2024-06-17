# Chat Application

## Introduction

This chat application provides a minimalistic platform for users to create or
join chats using a unique code. It features a responsive design, supports text
and multimedia messages, and includes animations and reactions for an engaging
user experience.

## Setup Instructions

### Prerequisites

• Node.js (v18 or above)

• yarn (v1.22.21 or above)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/TG-dev-master/live-chat-nextjs.git
```

2. Navigate to the project directory:

```bash
cd live-chat-nextjs
```

3. Install dependencies:

```bash
yarn
```

### Running the Application

1. Start the server:

```bash
yarn run dev
```

2. Open your web browser and navigate to `http://localhost:3000`.

### Creating a Chat

• To create a new chat, simply click on the 'Create Chat' button and share the
generated code with others.

### Joining a Chat

• To join an existing chat, enter the chat code provided by the chat initiator.

## Key Components

• [**Server**](https://www.pubnub.com/): PubNub server is used for providing
basic chat functionality - Manages connections, message broadcasting, and chat
room creation.

• [**Client**](): Provides the user interface for creating chat, joining chat
and chat interactions.

## Assumptions

• The application is designed for modern web browsers with JavaScript enabled.

• Users are responsible for sharing chat codes securely.

• Multimedia content is limited to images.

## Features

• [**Chat Creation/Joining**](): Users can start or join chats with a unique
code.

• [**Responsive Design**](): Adapts to various screen sizes for a consistent
experience.

• [**Message Types**](): Supports text, multi-line, emojis, and images.

• [**Animations**](): Smooth transitions and feedback for user actions.

• [**Typehead Indication**](): Shows when another user is typing.

• [**Reactions**](): Allows users to react to messages.

Thank you for using our chat application!
