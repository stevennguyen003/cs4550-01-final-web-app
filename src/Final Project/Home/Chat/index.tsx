import React, { useState, useEffect } from "react";
import ContentEditable from 'react-contenteditable'
import "./index.css";
import * as client from "./client";

interface Message {
    role: string;
    content: string;
}

function Chat() {
    const [conversation, setConversation] =
        useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
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
        <div className="chatbox">
            <ul className="list-group">
                {conversation.map((message, index) => (
                    <li key={index} className={`list-group-item
     ${message.role === "user" &&
                        "list-group-item-primary"}
     ${message.role === "assistant" &&
                        "list-group-item-success"}`}>
                        <strong>{message.role}</strong>:
                        {message.content}
                    </li>
                ))}
                <li className="list-group-item">
                    <textarea value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)}
                        className="form-control chat-input" />
                    <button onClick={sendMessage}
                        className="btn btn-primary">
                        ask our chatbot!
                    </button>
                </li>

            </ul>
        </div>
    )
}
export default Chat;