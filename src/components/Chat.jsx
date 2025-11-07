import { useEffect, useRef, useState, useCallback } from "react";
import { FiSend } from "react-icons/fi";
import { Message } from "./Message";
import { addMessage, readMessages } from "../utils";

export const Chatroom = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const unsubscribe = readMessages(setMessages);
        return () => unsubscribe && unsubscribe();
    }, []);

    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const text = inputRef.current?.value.trim();
            if (!text) return;

            const newMessage = {
                text,
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                timestamp: Date.now(),
            };

            try {
                await addMessage(newMessage);
                inputRef.current.value = "";
            } catch (error) {
                console.error("❌ Failed to send message:", error);
            }
        },
        [user]
    );

    return (
        <div className="chatroom-container flex flex-col h-full">
            <div
                ref={chatContainerRef}
                className="chatroom flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 rounded-xl shadow-inner"
            >
                {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} currentUser={user.uid} />
                ))}
            </div>

            <form
                onSubmit={handleSubmit}
                className="msgType flex items-center gap-2 p-2 bg-white border-t border-gray-200"
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Írj valamit..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                >
                    Küldés <FiSend className="scale-125" />
                </button>
            </form>
        </div>
    );
};
