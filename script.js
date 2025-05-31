const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const quickOptionsContainer = document.getElementById('quick-options');

function addMessage(text, sender, time = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-bubble ${sender}-message ${sender === 'user' ? 'self-end' : 'self-start'}`;
    messageDiv.innerHTML = `<p>${text}</p><p class="text-xs text-gray-500 mt-1">${time}</p>`;
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function sendMessage(messageText = '') {
    const text = messageText || userInput.value.trim();
    if (text === '') return;

    const currentTime = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    addMessage(text, 'user', currentTime);
    userInput.value = '';

    if (quickOptionsContainer && !['Horarios y Rutas', 'Cotización de servicios', 'Atención de reclamos'].includes(text)) {
        quickOptionsContainer.style.display = 'none';
    }

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message-bubble bot-message self-start typing-indicator';
    typingIndicator.innerHTML = '<p>El asistente está escribiendo...</p>';
    chatArea.appendChild(typingIndicator);
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
        typingIndicator.remove();
        let botResponse = '';
        const lowerText = text.toLowerCase();

        if (lowerText.includes('horarios') || lowerText.includes('rutas')) {
            if (lowerText.includes('piura') && lowerText.includes('lima')) {
                botResponse = '¡Claro! Los buses de **Piura a Lima** salen cada 2 horas desde las 6 AM hasta las 10 PM. ¿Te gustaría saber el precio?';
            } else if (lowerText.includes('lima') && lowerText.includes('cusco')) {
                botResponse = 'Desde **Lima a Cusco**, los buses salen a las 7 AM y 7 PM. ¿En qué fecha te gustaría viajar?';
            } else {
                botResponse = 'Por favor, indícanos el **origen** y **destino**. Ejemplo: "Horario de Piura a Lima".';
            }
        } else if (lowerText.includes('cotización') || lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('pasaje')) {
            botResponse = 'Para cotizar un pasaje, indícanos el origen, destino y fecha. Ejemplo: "Precio de Piura a Lima para mañana".';
        } else if (lowerText.includes('reclamo') || lowerText.includes('queja')) {
            botResponse = 'Lamentamos el inconveniente. Por favor, describe brevemente tu reclamo y nos pondremos en contacto contigo lo antes posible.';
        } else {
            botResponse = 'Lo siento, no entendí tu mensaje. ¿Puedes reformularlo o usar una de las opciones rápidas?';
        }

        const botTime = new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        addMessage(botResponse, 'bot', botTime);
    }, 1200);
}
