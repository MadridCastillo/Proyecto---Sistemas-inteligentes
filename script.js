const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const quickOptionsContainer = document.getElementById('quick-options');

let opcionesMostradas = false;

function addMessage(text, sender, time = '', extraClass = '') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-bubble ${sender}-message ${sender === 'user' ? 'self-end' : 'self-start'} ${extraClass}`;
    messageDiv.innerHTML = `<p>${text}</p><p class="text-xs text-gray-500 mt-1">${time}</p>`;
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function showMainMenu() {
    const botResponse = `
    ---------------------------------------------<br>
    1. 🚌 **Horarios y Rutas**<br>
    2. 💰 **Cotización de servicios**<br>
    3. 🗣️ **Atención de reclamos**<br>
    4. 🗺️ **Ubícanos**<br>  
    5. ↩️ **Volver al menú principal** (si deseas empezar de nuevo)<br>
    ---------------------------------------------
    `;
    
    addMessage(botResponse, 'bot', new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    if (quickOptionsContainer) {
        quickOptionsContainer.style.display = 'none';
    }
    opcionesMostradas = true;
}

// Ya no necesitamos getRandomPrice porque los precios serán fijos por ruta
// function getRandomPrice(min, max) {
//     const price = Math.random() * (max - min) + min;
//     return price.toFixed(2);
// }

function sendMessage(messageText = '') {
    const text = messageText || userInput.value.trim();
    if (text === '') return;

    const currentTime = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    addMessage(text, 'user', currentTime);
    userInput.value = '';

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message-bubble bot-message self-start typing-indicator';
    typingIndicator.innerHTML = '<p>El asistente está escribiendo...</p>';
    chatArea.appendChild(typingIndicator);
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
        typingIndicator.remove();
        let botResponse = '';
        let messageExtraClass = ''; 
        const lowerText = text.toLowerCase();
        const parsedNumber = parseInt(text);

        if (!opcionesMostradas) {
            showMainMenu();
            return;
        }

        if (parsedNumber === 1 || lowerText.includes('horarios') || lowerText.includes('rutas')) {
            botResponse = `¡Claro! Aquí tienes los **horarios y rutas disponibles** por el momento: <br><br>
            📅 **Hoy, ${new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Lima' })}**<br><br>
            
            1. 📍 **Casa Grande - Caserío San Vicente** <br>
               Salida: ⏰ **3:40 AM**<br><br>
            
            2. 📍 **La Arena - Caserío San Vicente** <br>
               Salida: ⏰ **4:00 AM**<br><br>
            
            3. 📍 **Cura Morí - Caserío San Vicente** <br>
               Salida: ⏰ **4:00 AM**<br><br>
            
            4. 📍 **Aledaños Kur Beert - Caserío San Vicente** <br>
               Salida: ⏰ **4:00 AM**<br><br>
            
            5. 📍 **Punta Arena - Caserío San Vicente** <br>
               Salida: ⏰ **3:00 AM**<br><br>
               
            Si deseas más información o tienes otra consulta, escribe 5 para volver al menú principal.
            `;

        } else if (parsedNumber === 2 || lowerText.includes('cotización') || lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('pasaje')) {

            const pricePuntaArena = '9.00'; 
            const priceSanVicente = '8.50'; 
            const priceCasaGrande = '8.00';
            const priceLaArena = '7.50';
            const priceCuraMori = '7.00'; 
            const priceKurBeert = '7.00';

            botResponse = `¡Entendido! Aquí tienes la cotización de nuestras rutas:<br><br>
            💸 Precios al **${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })}**:<br><br>
            
            1. 📍 **Punta Arena**: S/ ${pricePuntaArena}<br>
            2. 📍 **Caserío San Vicente**: S/ ${priceSanVicente}<br>
            3. 📍 **Casa Grande**: S/ ${priceCasaGrande}<br>
            4. 📍 **La Arena**: S/ ${priceLaArena}<br>
            5. 📍 **Cura Morí**: S/ ${priceCuraMori}<br>
            6. 📍 **Aledaños Kur Beert**: S/ ${priceKurBeert}<br><br>
            `;

        } else if (parsedNumber === 3 || lowerText.includes('reclamo') || lowerText.includes('queja')) {
            botResponse = `Para **atención de reclamos**, lamentamos el inconveniente. Por favor, comunícate con nosotros por las siguientes vías:<br><br>
            📧 **Correo electrónico:** <a href="mailto:arianapazramirez48@gmail.com" class="text-blue-600 hover:underline">arianapazramirez48@gmail.com</a> (describe brevemente tu reclamo)<br>
            📞 **Teléfono:** Puedes llamarnos al **<a href="tel:+51969023429" class="text-blue-600 hover:underline">+51 969 023 429</a>**.<br><br>
            Nos pondremos en contacto contigo lo antes posible.
            Si deseas más información o tienes otra consulta, escribe 5 para volver al menú principal.
            `;
            
        } else if (parsedNumber === 4 || lowerText.includes('ubícanos') || lowerText.includes('ubicacion') || lowerText.includes('mapa') || lowerText.includes('direccion')) {
            const bingMapsEmbedLink = "https://www.bing.com/maps/embed?h=450&w=600&cp=-5.249512~-80.660827&lvl=16&typ=d&sty=r&src=SHELL&form=BMEMJS";
            const bingMapsDirectLink = "https://www.bing.com/maps?&q=Empresa%20De%20Transportes%20P%20G%2C%20Jr.%20Mariano%20Diaz%20633%20Piura%2C%20Piura%2C%20PE"; 
            
            botResponse = `¡Claro! Nuestra oficina principal se encuentra en **Jr. Mariano Diaz 633, Catacaos 20006**.<br><br>
            Puedes encontrarnos fácilmente en el siguiente enlace de Bing Maps (se abrirá en una nueva pestaña):<br>
            <a href="${bingMapsDirectLink}" target="_blank" class="text-blue-600 hover:underline">Ver ubicación en Bing Maps</a><br><br>
            También puedes ver nuestra ubicación aproximada en este mapa:<br>
            <iframe 
                src="${bingMapsEmbedLink}" 
                width="100%" 
                height="300" 
                style="border:0; border-radius: 10px; margin-top: 10px;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe><br><br>
            Si necesitas más ayuda, escribe 5 para volver al menú principal.
            `;
            messageExtraClass = 'map-message-bubble'; 

        } else if (parsedNumber === 5 || lowerText.includes('menu') || lowerText.includes('opciones') || lowerText.includes('volver')) {
            showMainMenu();
            return;
        } else {
            botResponse = 'Lo siento, no entendí tu mensaje o la opción seleccionada. Por favor, elige una opción del menú principal (1, 2, 3, 4 o 5) o presiona el número 5 para verlas de nuevo.';
        }

        const botTime = new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        addMessage(botResponse, 'bot', botTime, messageExtraClass);
    }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        showMainMenu();
    }, 1500); 
});

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});