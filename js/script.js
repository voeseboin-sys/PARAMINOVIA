/**
 * NUESTRA HISTORIA - Tarjeta de Amor Interactiva
 * JavaScript con animaciones avanzadas y gestión de audio
 */

// ============================================
// CONFIGURACIÓN Y ESTADO
// ============================================
const CONFIG = {
    // Fecha de inicio del amor: 9 de Agosto de 2024
    startDate: new Date('2024-08-09T00:00:00'),
    
    // Tiempos de animación (en ms)
    timings: {
        heartMorph: 1500,
        seedFall: 1000,
        seedBounce: 400,
        trunkGrow: 3000,
        branchGrow: 1000,
        leafAppear: 500,
        cameraSlide: 1500,
        textFade: 1000,
        poemStagger: 200
    },
    
    // Configuración de hojas
    leaves: {
        count: 80,
        positions: [
            // Posiciones relativas (x%, y%) donde aparecerán las hojas
            {x: 20, y: 35}, {x: 25, y: 30}, {x: 15, y: 40},
            {x: 75, y: 32}, {x: 80, y: 28}, {x: 85, y: 35},
            {x: 30, y: 45}, {x: 35, y: 40}, {x: 25, y: 50},
            {x: 70, y: 42}, {x: 75, y: 38}, {x: 65, y: 48},
            {x: 35, y: 55}, {x: 40, y: 50}, {x: 30, y: 60},
            {x: 65, y: 52}, {x: 70, y: 48}, {x: 60, y: 58},
            {x: 45, y: 25}, {x: 55, y: 22}, {x: 50, y: 18},
            {x: 10, y: 55}, {x: 90, y: 45}, {x: 5, y: 65},
            {x: 95, y: 38}, {x: 15, y: 25}, {x: 85, y: 22},
            {x: 40, y: 35}, {x: 60, y: 32}, {x: 50, y: 28},
            {x: 25, y: 65}, {x: 75, y: 58}, {x: 20, y: 72},
            {x: 80, y: 65}, {x: 30, y: 75}, {x: 70, y: 68},
            {x: 45, y: 15}, {x: 55, y: 12}, {x: 50, y: 8},
            {x: 35, y: 20}, {x: 65, y: 18}, {x: 40, y: 12},
            {x: 12, y: 48}, {x: 88, y: 52}, {x: 8, y: 58},
            {x: 92, y: 32}, {x: 18, y: 32}, {x: 82, y: 28},
            {x: 48, y: 45}, {x: 52, y: 42}, {x: 50, y: 38},
            {x: 22, y: 58}, {x: 78, y: 55}, {x: 28, y: 68},
            {x: 72, y: 62}, {x: 32, y: 82}, {x: 68, y: 75},
            {x: 42, y: 8}, {x: 58, y: 6}, {x: 50, y: 3},
            {x: 38, y: 28}, {x: 62, y: 25}, {x: 45, y: 32},
            {x: 15, y: 62}, {x: 85, y: 58}, {x: 12, y: 72},
            {x: 88, y: 68}, {x: 18, y: 78}, {x: 82, y: 72},
            {x: 55, y: 48}, {x: 45, y: 52}, {x: 50, y: 55},
            {x: 33, y: 62}, {x: 67, y: 58}, {x: 37, y: 68},
            {x: 63, y: 65}, {x: 28, y: 78}, {x: 72, y: 72},
            {x: 48, y: 5}, {x: 52, y: 3}, {x: 50, y: 0}
        ]
    },
    
    // Configuración de lluvia de corazones
    rain: {
        interval: 800, // ms entre cada corazón
        minDuration: 4, // segundos mínimos de caída
        maxDuration: 8  // segundos máximos de caída
    }
};

// Estado de la aplicación
const state = {
    currentScene: 'heart',
    audioStarted: false,
    treeGrown: false,
    rainStarted: false,
    animationCompleted: false
};

// ============================================
// REFERENCIAS DOM
// ============================================
const elements = {
    // Audio
    bgMusic: document.getElementById('bgMusic'),
    
    // Escenas
    sceneHeart: document.getElementById('sceneHeart'),
    sceneSeed: document.getElementById('sceneSeed'),
    sceneTree: document.getElementById('sceneTree'),
    sceneMessage: document.getElementById('sceneMessage'),
    
    // Elementos del corazón
    heartButton: document.getElementById('heartButton'),
    
    // Elementos de la semilla
    seed: document.getElementById('seed'),
    
    // Elementos del árbol
    treeContainer: document.getElementById('treeContainer'),
    leavesContainer: document.getElementById('leavesContainer'),
    trunk: document.querySelector('.trunk'),
    branches: document.querySelectorAll('.branch'),
    
    // Elementos del mensaje
    messageTitle: document.querySelector('.message-title'),
    poemLines: document.querySelectorAll('.poem-line'),
    counterSection: document.querySelector('.counter-section'),
    
    // Contador
    daysEl: document.getElementById('days'),
    hoursEl: document.getElementById('hours'),
    minutesEl: document.getElementById('minutes'),
    secondsEl: document.getElementById('seconds'),
    
    // Lluvia de corazones
    heartsRain: document.getElementById('heartsRain')
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    // Mostrar escena inicial
    showScene('heart');
    
    // Configurar event listeners
    setupEventListeners();
    
    // Intentar iniciar audio automáticamente (puede ser bloqueado por el navegador)
    attemptAutoPlay();
    
    // Iniciar contador
    updateCounter();
    setInterval(updateCounter, 1000);
}

function setupEventListeners() {
    // Click en el corazón
    elements.heartButton.addEventListener('click', handleHeartClick);
    
    // Intentar iniciar audio en cualquier interacción con la página
    document.addEventListener('click', attemptAudioStart, { once: true });
    document.addEventListener('touchstart', attemptAudioStart, { once: true });
}

// ============================================
// GESTIÓN DE AUDIO
// ============================================
function attemptAutoPlay() {
    // Intentar reproducir automáticamente
    const playPromise = elements.bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                state.audioStarted = true;
                console.log('Audio iniciado automáticamente');
            })
            .catch(error => {
                console.log('Autoplay bloqueado, esperando interacción del usuario');
            });
    }
}

function attemptAudioStart() {
    if (!state.audioStarted && elements.bgMusic.paused) {
        elements.bgMusic.volume = 0.7;
        elements.bgMusic.play()
            .then(() => {
                state.audioStarted = true;
                console.log('Audio iniciado por interacción del usuario');
            })
            .catch(error => {
                console.error('Error al iniciar audio:', error);
            });
    }
}

// ============================================
// CONTROL DE ESCENAS
// ============================================
function showScene(sceneName) {
    // Ocultar todas las escenas
    Object.values(elements).forEach(el => {
        if (el && el.classList && el.classList.contains('scene')) {
            el.classList.remove('active');
        }
    });
    
    // Mostrar escena solicitada
    switch(sceneName) {
        case 'heart':
            elements.sceneHeart.classList.add('active');
            break;
        case 'seed':
            elements.sceneSeed.classList.add('active');
            break;
        case 'tree':
            elements.sceneTree.classList.add('active');
            break;
        case 'message':
            elements.sceneMessage.classList.add('active');
            break;
    }
    
    state.currentScene = sceneName;
}

// ============================================
// ANIMACIÓN DEL CORAZÓN A SEMILLA
// ============================================
function handleHeartClick() {
    if (state.currentScene !== 'heart') return;
    
    // Asegurar que el audio esté sonando
    attemptAudioStart();
    
    // Crear partículas de efecto
    createHeartParticles();
    
    // Iniciar animación de morphing
    elements.heartButton.classList.add('heart-morphing');
    
    // Esperar a que termine el morphing y cambiar a semilla
    setTimeout(() => {
        transitionToSeed();
    }, CONFIG.timings.heartMorph);
}

function createHeartParticles() {
    const rect = elements.heartButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        document.body.appendChild(particle);
        
        // Activar animación
        requestAnimationFrame(() => {
            particle.classList.add('active');
        });
        
        // Limpiar
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// ============================================
// TRANSICIÓN A SEMILLA
// ============================================
function transitionToSeed() {
    showScene('seed');
    
    // Iniciar caída de la semilla
    setTimeout(() => {
        elements.seed.classList.add('falling');
        
        // Después de la caída, hacer rebote y transición al árbol
        setTimeout(() => {
            elements.seed.classList.remove('falling');
            elements.seed.classList.add('bouncing');
            
            setTimeout(() => {
                transitionToTree();
            }, CONFIG.timings.seedBounce + 200);
        }, CONFIG.timings.seedFall);
    }, 100);
}

// ============================================
// TRANSICIÓN AL ÁRBOL
// ============================================
function transitionToTree() {
    showScene('tree');
    
    // Iniciar crecimiento del tronco
    setTimeout(() => {
        elements.trunk.classList.add('growing');
        
        // Iniciar crecimiento de ramas con delays
        elements.branches.forEach((branch, index) => {
            setTimeout(() => {
                branch.classList.add('growing');
            }, 1000 + (index * 100));
        });
        
        // Después de que crezcan las ramas, aparecen las hojas
        setTimeout(() => {
            growLeaves();
        }, CONFIG.timings.trunkGrow + 500);
        
    }, 300);
}

// ============================================
// CRECIMIENTO DE HOJAS
// ============================================
function growLeaves() {
    const positions = CONFIG.leaves.positions;
    
    positions.forEach((pos, index) => {
        setTimeout(() => {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.style.left = `${pos.x}%`;
            leaf.style.top = `${pos.y}%`;
            
            // Variación aleatoria de tamaño
            const scale = 0.7 + Math.random() * 0.6;
            leaf.style.transform = `scale(${scale})`;
            
            // Variación de retraso en la animación de sway
            leaf.style.animationDelay = `${Math.random() * 2}s`;
            
            elements.leavesContainer.appendChild(leaf);
            
            // Activar animación de aparición
            requestAnimationFrame(() => {
                leaf.classList.add('growing');
            });
        }, index * 30); // 30ms entre cada hoja
    });
    
    // Marcar árbol como completo
    state.treeGrown = true;
    
    // Después de que todas las hojas aparezcan, iniciar transición al mensaje
    setTimeout(() => {
        transitionToMessage();
    }, (positions.length * 30) + 1500);
}

// ============================================
// TRANSICIÓN AL MENSAJE
// ============================================
function transitionToMessage() {
    // Desplazar el árbol hacia la izquierda
    elements.sceneTree.classList.add('shifted');
    
    // Mostrar escena de mensaje
    setTimeout(() => {
        showScene('message');
        
        // La escena del árbol sigue visible pero desplazada
        elements.sceneTree.style.opacity = '1';
        elements.sceneTree.style.visibility = 'visible';
        
        // Animar elementos del mensaje
        animateMessageElements();
        
        // Iniciar lluvia de corazones
        setTimeout(() => {
            startHeartsRain();
        }, 2500);
        
    }, CONFIG.timings.cameraSlide / 2);
}

function animateMessageElements() {
    // Animar título
    setTimeout(() => {
        elements.messageTitle.classList.add('visible');
    }, 500);
    
    // Animar líneas del poema
    elements.poemLines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, 800 + (index * CONFIG.timings.poemStagger));
    });
    
    // Animar contador
    setTimeout(() => {
        elements.counterSection.classList.add('visible');
    }, 800 + (elements.poemLines.length * CONFIG.timings.poemStagger) + 300);
}

// ============================================
// CONTADOR DE TIEMPO
// ============================================
function updateCounter() {
    const now = new Date();
    const diff = now - CONFIG.startDate;
    
    // Calcular unidades de tiempo
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Actualizar DOM con formato
    elements.daysEl.textContent = String(days).padStart(3, '0');
    elements.hoursEl.textContent = String(hours).padStart(2, '0');
    elements.minutesEl.textContent = String(minutes).padStart(2, '0');
    elements.secondsEl.textContent = String(seconds).padStart(2, '0');
}

// ============================================
// LLUVIA DE CORAZONES
// ============================================
function startHeartsRain() {
    if (state.rainStarted) return;
    
    state.rainStarted = true;
    
    // Crear corazones cayendo periódicamente
    setInterval(() => {
        createFallingHeart();
    }, CONFIG.rain.interval);
    
    // Crear algunos corazones iniciales
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFallingHeart(), i * 200);
    }
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    
    // Posición horizontal aleatoria
    const leftPosition = Math.random() * 100;
    heart.style.left = `${leftPosition}%`;
    
    // Tamaño aleatorio
    const size = 15 + Math.random() * 15;
    heart.style.width = `${size}px`;
    heart.style.height = `${size * 0.9}px`;
    
    // Duración de caída aleatoria
    const duration = CONFIG.rain.minDuration + Math.random() * (CONFIG.rain.maxDuration - CONFIG.rain.minDuration);
    heart.style.animationDuration = `${duration}s`;
    
    // Retraso aleatorio
    const delay = Math.random() * 2;
    heart.style.animationDelay = `${delay}s`;
    
    elements.heartsRain.appendChild(heart);
    
    // Activar animación
    requestAnimationFrame(() => {
        heart.classList.add('falling');
    });
    
    // Limpiar después de la animación
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// ============================================
// UTILIDADES
// ============================================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Prevenir zoom en dispositivos móviles
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

document.addEventListener('gesturechange', (e) => {
    e.preventDefault();
});

document.addEventListener('gestureend', (e) => {
    e.preventDefault();
});

// Prevenir scroll en la página
document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Console easter egg
console.log('%c❤️ Nuestra Historia ❤️', 'font-size: 24px; color: #ff6b6b; font-weight: bold;');
console.log('%cPara el amor de mi vida', 'font-size: 14px; color: #8b6b6b;');
console.log('%cDesde el 9 de Agosto de 2024', 'font-size: 12px; color: #aaa;');
