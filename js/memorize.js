const board = document.getElementById('board');
const confetti = document.getElementById('confetti');

let flippedCards = [];
let lockBoard = false;

// Frases asociadas a imágenes
const frases = [
    { text: "Dopamina + noradrenalina = regulación atencional", icon: './style/assets/cara.png' },
    { text: "Corteza prefrontal: director de orquesta cerebral", icon: './style/assets/estomagoBueno.png' },
    { text: "Circuitos fronto-estriatales: autopista de las funciones ejecutivas", icon: './style/assets/estomagoMalo.png' },
    { text: "Memoria de trabajo: el bloc de notas mental", icon: './style/assets/guardar.png' },
    { text: "Profármaco: liberación prolongada de dexanfetamina", icon: './style/assets/paleta.png' },
    { text: "Hidrólisis eritrocitaria: activación en torrente sanguíneo", icon: './style/assets/pastillaMala.png' },
    { text: "Recaptación inhibida = neurotransmisión optimizada", icon: './style/assets/cara.png' },
    { text: "13 horas de cobertura sintomática continua", icon: './style/assets/estomagoBueno.png' },
    { text: "Inatención persistente ≠ falta de voluntad", icon: './style/assets/estomagoMalo.png' },
    { text: "Hiperfoco: atención láser en intereses selectivos", icon: './style/assets/guardar.png' },
    { text: "Desregulación emocional: tormentas afectivas repentinas", icon: './style/assets/paleta.png' },
    { text: "Procrastinación crónica: parálisis ejecutiva", icon: './style/assets/pastillaMala.png' },
    { text: "30 mg lisdexanfetamina = 8.9 mg dexanfetamina activa", icon: './style/assets/cara.png' },
    { text: "Administración con alimentos: biodisponibilidad preservada", icon: './style/assets/estomagoBueno.png' },
    { text: "Mecanismo prodrogado: menor potencial de abuso", icon: './style/assets/estomagoMalo.png' },
    { text: "Efecto rebote controlado: curva farmacocinética suave", icon: './style/assets/guardar.png' },
    { text: "TDAH adulto: 60% mantiene síntomas tras la infancia", icon: './style/assets/paleta.png' },
    { text: "Comorbilidades frecuentes: ansiedad + trastornos del aprendizaje", icon: './style/assets/pastillaMala.png' },
    { text: "Neuroplasticidad: el cerebro se reconfigura con tratamiento", icon: './style/assets/cara.png' },
    { text: "Fenotipo combinado: 70% de los casos diagnosticados", icon: './style/assets/estomagoBueno.png' },
    { text: "No es pereza: falla en la autoregulación neuroquímica", icon: './style/assets/estomagoMalo.png' },
    { text: "Diagnóstico diferencial: descartar trastornos tiroideos", icon: './style/assets/guardar.png' },
    { text: "Terapia multimodal: fármacos + estrategias compensatorias", icon: './style/assets/paleta.png' },
    { text: "Lisdexanfetamina: estabilidad molecular = respuesta sostenida", icon: './style/assets/pastillaMala.png' }
];

// 🔥 Duplicamos para tener pares
const cardsData = [...frases, ...frases];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderCards() {
    board.innerHTML = '';
    const shuffled = [...cardsData];
    shuffle(shuffled);

    shuffled.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value.text; // ahora el valor es el texto

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const front = document.createElement('div');
        front.className = 'card-front';
        front.textContent = '';

        const back = document.createElement('div');
        back.className = 'card-back group-' + (Math.floor(index / 12) + 1); // Asignar grupo de color
        back.innerHTML = `
            <img src="${value.icon}" class="icon" alt="icono" />
            <div class="text">${value.text}</div>
        `;

        const check = document.createElement('div');
        check.className = 'check';
        check.textContent = '✓';

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);
        card.appendChild(check);

        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    const audio = document.getElementById('clickSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }

    if (flippedCards.length === 2) {
        lockBoard = true; // ✅ Bloqueamos ya
        setTimeout(checkForMatch, 1000); // ⏳ Esperamos 1000 ms para dejar que giren completamente
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.value === card2.dataset.value;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        checkWin();
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
    lockBoard = false;
}

function checkWin() {
    const matchedCards = document.querySelectorAll('.card.matched');
    if (matchedCards.length === cardsData.length) {
        confetti.style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 5000);
    }
}

function startGame() {
    flippedCards = [];
    lockBoard = true; // bloqueamos temporalmente

    renderCards();

    // Mostrar reverso automáticamente
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.add('flipped');
    });

    // Después de 5 segundos, esconder reverso y liberar
    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('flipped');
        });
        lockBoard = false;
    }, 5000); // 🔥 5000 ms = 5 segundos
}

function goHome() {
    window.location.href = 'home.html';
}

// Inicializar juego
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});
