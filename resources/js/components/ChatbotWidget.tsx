import React, { FormEvent, useEffect, useState } from 'react';

type Message = {
    from: 'user' | 'bot';
    text: string;
};

const ChatbotWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            from: 'bot',
            text: '¡Hola! 🌿 Soy TlalliBot. ¿En qué puedo ayudarte hoy?',
        },
    ]);
    const [input, setInput] = useState('');

    // Obtener token CSRF del meta
    const [csrf, setCsrf] = useState<string | null>(null);

    useEffect(() => {
        const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        if (meta) {
            setCsrf(meta.content);
        }
    }, []);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const closeChat = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const text = input.trim();
        if (!text) return;

        // Agregar mensaje del usuario
        setMessages((prev) => [...prev, { from: 'user', text }]);
        setInput('');

        try {
            const res = await fetch('/chatbot/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf || '',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();
            const reply = data?.reply ?? 'Lo siento, ocurrió un error al obtener la respuesta.';

            setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    from: 'bot',
                    text: 'Hubo un problema al conectar con el servidor 😔',
                },
            ]);
        }
    };

    return (
        <div id="chatbot-widget">
            {/* Botón flotante */}
            <button id="chatbot-toggle" className="chatbot-btn" aria-label="Abrir chat Tlalli" onClick={toggleOpen} type="button">
                💬
            </button>

            {/* Ventana del chat */}
            {isOpen && (
                <div id="chatbot-window" className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <span className="chatbot-title">TlalliBot</span>
                            <span className="chatbot-subtitle">Dudas sobre agricultura sustentable</span>
                        </div>
                        <button id="chatbot-close" className="chatbot-close" aria-label="Cerrar chat" type="button" onClick={closeChat}>
                            &times;
                        </button>
                    </div>

                    <div id="chatbot-messages" className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chatbot-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form id="chatbot-form" className="chatbot-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="chatbot-input"
                            className="chatbot-input"
                            placeholder="Escribe tu pregunta..."
                            autoComplete="off"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="chatbot-send">
                            Enviar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatbotWidget;
