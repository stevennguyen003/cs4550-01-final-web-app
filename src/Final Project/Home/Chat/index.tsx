import React, { useState, useEffect } from "react";

import "./index.css";
import * as client from "./client";


interface Message {
    role: string;
    content: string;
}
enum Screen { Chat, Exercises };

function Chat() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [conversation, setConversation] =
        useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const sendMessage = async () => {
        setIsLoading(true);
        const userMessage = {
            role: "user", content: message
        };
        const response = await client
            .postMessage(userMessage);
        setConversation([...conversation,
            userMessage, response]);
        setMessage("");
        setIsLoading(false);
    };
    const getConversation = async () => {
        setIsLoading(true);
        const conversation = await
            client.getConversation();
        setConversation(conversation);
        setIsLoading(false);
    };

    useEffect(() => {
        getConversation();
    }, []);

    return (
        <div className="chatbox-container">
            {isLoading ? <div className="loading-container">
            <div className="loading-spinner"></div>
      <p className="loading-text text-gradient">Please wait :)...</p>
                    </div> : (
                <>
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
                </>)}
            <button onClick={sendMessage}
                className="btn btn-primary chatbox-submit post-button">
                <b>ask our chatbot!</b>
            </button>
        </div >
    )
}
export default Chat;