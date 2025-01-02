// Fecha de destino: 03/01/2025 a las 16:00 hora de España
const targetDate = new Date("2025-01-03T16:00:00");

// Elementos del DOM
const countdownElement = document.getElementById("timer");
const eventMessage = document.getElementById("eventMessage");
const sound = document.getElementById("sound");
const backgroundMusic = document.getElementById("backgroundMusic");

// Reproducir la música al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    backgroundMusic.play().catch((error) => {
        console.error("Error al reproducir la música de fondo:", error);
    });
});

function updateCountdown() {
    const now = new Date();
    const remainingTime = targetDate - now;

    if (remainingTime <= 0) {
        eventMessage.innerHTML = "¡El evento ha comenzado!"; // Mensaje de evento
        countdownElement.innerHTML = "00:00:00"; // Detener el contador
        clearInterval(countdownInterval);
        backgroundMusic.pause(); // Detener la música de fondo
        return;
    }

    const hours = Math.floor(remainingTime / (1000 * 60 * 60)); // Horas
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // Minutos
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000); // Segundos

    countdownElement.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    // Verificar si llega a 1:50
    if (minutes === 1 && seconds === 50) {
        backgroundMusic.pause(); // Pausar la música de fondo
    }

    // Verificar si llega a 1:48
    if (minutes === 1 && seconds === 48) {
        sound.play(); // Reproducir el sonido
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Actualizar cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);
