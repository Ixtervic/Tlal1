<div id="chatbot-widget">
    {{-- Botón flotante circular --}}
    <button id="chatbot-toggle" class="chatbot-btn" aria-label="Abrir chat Tlalli">
    
    </button>

    {{-- Ventana del chat --}}
    <div id="chatbot-window" class="chatbot-window chatbot-hidden">
        <div class="chatbot-header">
            <div class="chatbot-header-info">
                <span class="chatbot-title">TlalliBot</span>
                <span class="chatbot-subtitle">Dudas sobre agricultura sustentable</span>
            </div>
            <button id="chatbot-close" class="chatbot-close" aria-label="Cerrar chat">
                &times;
            </button>
        </div>

        <div id="chatbot-messages" class="chatbot-messages">
            <div class="chatbot-bubble bot">
                ¡Hola! 🌿 Soy TlalliBot. ¿En qué puedo ayudarte hoy?
            </div>
        </div>

        <form id="chatbot-form" class="chatbot-form">
            @csrf
            <input
                type="text"
                id="chatbot-input"
                class="chatbot-input"
                placeholder="Escribe tu pregunta..."
                autocomplete="off"
            >
            <button type="submit" class="chatbot-send">
                Enviar
            </button>
        </form>
    </div>
</div>
