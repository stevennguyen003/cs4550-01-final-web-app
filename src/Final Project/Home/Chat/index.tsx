import React, { useState, useEffect } from "react";
import ContentEditable from 'react-contenteditable'
import "./index.css";
import * as client from "./client";

interface Message {
    role: string;
    content: string;
}
enum Screen { Chat, Exercises };

function Chat() {
    const [conversation, setConversation] =
        useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [chatScreen, setChatScreen] = useState(Screen.Chat);
    const sendMessage = async () => {
        const userMessage = {
            role: "user", content: message
        };
        const response = await client
            .postMessage(userMessage);
        setConversation([...conversation,
            userMessage, response]);
        setMessage("");
    };
    const getConversation = async () => {
        const conversation = await
            client.getConversation();
        setConversation(conversation);
    };

    useEffect(() => {
        getConversation();
    }, []);

    return (
        <div className="chatbox-container">
            <div className="chatbox-messages">
                {conversation.map((message, index) => (
                    <div key={index} className={`message
     ${message.role === "user" ? "user" : "assistant"}`}>
                        <strong>{message.role}: </strong>
                        {message.content}
                    </div>
                ))}
            </div>
            <textarea value={message}
                onChange={(e) =>
                    setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
                className="form-control chatbox-input" />
            <button onClick={sendMessage}
                className="btn btn-primary chatbox-submit">
                <b>ask our chatbot!</b>
            </button>
        </div >
    )
}
export default Chat;