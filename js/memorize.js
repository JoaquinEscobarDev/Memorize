const board = document.getElementById('board');
const confetti = document.getElementById('confetti');

let flippedCards = [];
let lockBoard = false;

const frases = [
    "Dopamina + noradrenalina = regulación atencional",
    "Corteza prefrontal: director de orquesta cerebral",
    "Circuitos fronto-estriatales: autopista de las funciones ejecutivas",
    "Memoria de trabajo: el bloc de notas mental",
    "Profármaco: liberación prolongada de dexanfetamina",
    "Hidrólisis eritrocitaria: activación en torrente sanguíneo",
    "Recaptación inhibida = neurotransmisión optimizada",
    "13 horas de cobertura sintomática continua",
    "Inatención persistente ≠ falta de voluntad",
    "Hiperfoco: atención láser en intereses selectivos",
    "Desregulación emocional: tormentas afectivas repentinas",
    "Procrastinación crónica: parálisis ejecutiva",
    "30 mg lisdexanfetamina = 8.9 mg dexanfetamina activa",
    "Administración con alimentos: biodisponibilidad preservada",
    "Mecanismo prodrogado: menor potencial de abuso",
    "Efecto rebote controlado: curva farmacocinética suave",
    "TDAH adulto: 60% mantiene síntomas tras la infancia",
    "Comorbilidades frecuentes: ansiedad + trastornos del aprendizaje",
    "Neuroplasticidad: el cerebro se reconfigura con tratamiento",
    "Fenotipo combinado: 70% de los casos diagnosticados",
    "No es pereza: falla en la autoregulación neuroquímica",
    "Diagnóstico diferencial: descartar trastornos tiroideos",
    "Terapia multimodal: fármacos + estrategias compensatorias",
    "Lisdexanfetamina: estabilidad molecular = respuesta sostenida"
];

const cardsData = frases;

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
    shuffled.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const front = document.createElement('div');
        front.className = 'card-front';
        front.textContent = '';

        const back = document.createElement('div');
        back.className = 'card-back';
        back.textContent = value;

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
        // Espera un poquito antes de bloquear
        setTimeout(() => {
            lockBoard = true;
            setTimeout(checkForMatch, 700); // luego de otro momento revisa si coinciden
        }, 400); // deja que la carta termine de girar (ajustable según la animación)
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
            window.location.href = 'home.html'; // ← volver a home.html (ajusta el nombre si tu home se llama diferente)
        }, 5000);
    }
}

function startGame() {
    flippedCards = [];
    lockBoard = false;
    renderCards();
}

// Al cargar la página automáticamente inicia el juego
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

// Si quieres mantener los botones para reiniciar o volver al home
function goHome() {
    window.location.href = 'home.html'; // ← asegúrate que el nombre sea correcto
}
