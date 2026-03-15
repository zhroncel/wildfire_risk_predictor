import { useState } from "react";
import { askAI } from "../services/api";

function AIChat({ analysis }) {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async (questionText) => {

        const question = questionText || input;
        if (!question) return;

        setInput(""); // ⭐ hemen temizle

        const userMessage = { role: "user", text: question };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        const res = await askAI({
            question,
            ...analysis
        });

        setLoading(false);

        const botMessage = { role: "bot", text: res.answer };

        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <div className="chat-container">

            {/* hazır soru butonları */}

            <div className="quick-questions">
                <button onClick={() => sendMessage("Bu bölgede yangın riski neden yüksek?")}>
                    Risk neden yüksek?
                </button>

                <button onClick={() => sendMessage("Yangın ne kadar büyüyebilir?")}>
                    Yangın ne kadar büyüyebilir?
                </button>

                <button onClick={() => sendMessage("Bu risk durumunda hangi önlemler alınmalı?")}>
                    Önlem önerileri
                </button>
            </div>

            <div className="chat-messages">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.role === "user" ? "chat-user" : "chat-bot"}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && (
                    <div className="chat-bot">
                        AI analiz yapıyor...
                    </div>
                )}

            </div>

            <div className="chat-input">

                <input
                    type="text"
                    placeholder="Sorunuzu yazın..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                />

                <button onClick={() => sendMessage()}>
                    Gönder
                </button>

            </div>

        </div>
    );
}

export default AIChat;