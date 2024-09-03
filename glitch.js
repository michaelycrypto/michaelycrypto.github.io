const text = "michaelycrypto";
const typingText = document.getElementById('typing-text');
const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
let i = 0;
const typingSpeed = 225;
const katakanaRotationSpeed = 75;
const katakanaRotations = 2;

function getRandomKatakana() {
    return katakana[Math.floor(Math.random() * katakana.length)];
}

function rotateKatakana(index, char, rotations) {
    if (rotations > 0) {
        let currentText = typingText.textContent;
        currentText = currentText.substring(0, index) + getRandomKatakana() + currentText.substring(index + 1);
        typingText.textContent = currentText;
        setTimeout(() => rotateKatakana(index, char, rotations - 1), katakanaRotationSpeed);
    } else {
        let currentText = typingText.textContent;
        currentText = currentText.substring(0, index) + char + currentText.substring(index + 1);
        typingText.textContent = currentText;
    }
}

function typeNextChar() {
    if (i < text.length) {
        const char = text.charAt(i);
        typingText.textContent += getRandomKatakana();
        rotateKatakana(i, char, katakanaRotations);
        i++;
        setTimeout(typeNextChar, typingSpeed);
    } else {
        startGlitchEffect();
    }
}

function startGlitchEffect() {
    setInterval(glitchEffect, 2000);
}

function glitchEffect() {
    const glitchDuration = 500;
    const rotationInterval = 250;
    const glitchCount = Math.floor(Math.random() * 2) + 1;
    let indices = [];
    let originalChars = [];

    for (let i = 0; i < glitchCount; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * text.length);
        } while (indices.includes(index));
        indices.push(index);
        originalChars.push(text[index]);
    }

    let rotationCount = Math.floor(glitchDuration / rotationInterval);
    let glitchRotationInterval = setInterval(() => {
        indices.forEach((index) => {
            typingText.textContent = typingText.textContent.substring(0, index) + getRandomKatakana() + typingText.textContent.substring(index + 1);
        });
        rotationCount--;
        if (rotationCount <= 0) {
            clearInterval(glitchRotationInterval);
            indices.forEach((index, i) => {
                typingText.textContent = typingText.textContent.substring(0, index) + originalChars[i] + typingText.textContent.substring(index + 1);
            });
        }
    }, rotationInterval);
}

typeNextChar();