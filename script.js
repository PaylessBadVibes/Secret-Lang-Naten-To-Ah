let currentPage = 1;
const totalPages = 4;

const hackingMessages = [
    { text: '> Initializing breach protocol...', delay: 0, type: 'normal' },
    { text: '> Bypassing firewall...', delay: 800, type: 'normal' },
    { text: '> Access granted ✓', delay: 1600, type: 'success' },
    { text: '> Scanning device...', delay: 2200, type: 'normal' },
    { text: '> Device identified: Bea\'s Phone', delay: 2800, type: 'warning' },
    { text: '> Extracting data...', delay: 3400, type: 'normal' },
    { text: '> Photos: 2,847 files', delay: 4000, type: 'success' },
    { text: '> Messages: Found something interesting...', delay: 4600, type: 'warning' },
    { text: '> WARNING: Unauthorized access detected', delay: 5200, type: 'error' },
    { text: '> Just kidding :) <3', delay: 5800, type: 'success' },
    { text: '> You have a secret letter...', delay: 6400, type: 'warning' }
];

window.addEventListener('load', () => {
    startHackingIntro();
});

function startHackingIntro() {
    const textContainer = document.getElementById('hackingText');
    const progressBar = document.getElementById('hackingBar');
    const continueBtn = document.getElementById('hackingBtn');
    
    hackingMessages.forEach((msg, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = `typing-line ${msg.type}`;
            typeText(line, msg.text, 0);
            textContainer.appendChild(line);
            
            const progress = ((index + 1) / hackingMessages.length) * 100;
            progressBar.style.width = progress + '%';
            
            if (index === hackingMessages.length - 1) {
                setTimeout(() => {
                    continueBtn.style.display = 'inline-flex';
                    continueBtn.style.animation = 'fadeIn 0.5s ease-out';
                }, 1000);
            }
        }, msg.delay);
    });
}

function typeText(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeText(element, text, index + 1), 30);
    }
}

function revealLetter() {
    const overlay = document.getElementById('hackingOverlay');
    overlay.classList.add('hidden');
    
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}

function updateProgress() {
    const progress = (currentPage / totalPages) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function goToPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(`page${pageNum}`).classList.add('active');
    
    currentPage = pageNum;
    updateProgress();
}

function nextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
});

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-light);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        transform: translate(-50%, -50%);
        animation: rippleEffect 0.6s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

function handleYes() {
    const overlay = document.getElementById('successOverlay');
    overlay.style.display = 'block';
    
    createConfetti();
}

function createConfetti() {
    const colors = ['#A79277', '#C4B5A0', '#8B7355', '#FFF2E1'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.width = (Math.random() * 8 + 6) + 'px';
            confetti.style.height = (Math.random() * 8 + 6) + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.position = 'fixed';
            confetti.style.zIndex = '150';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

function moveButton(btn) {
    const card = btn.closest('.content');
    const cardRect = card.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    
    const maxMove = 100;
    const randomX = (Math.random() - 0.5) * maxMove * 2;
    const randomY = (Math.random() - 0.5) * maxMove;
    
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function handleNo() {
    const btn = document.querySelector('.btn-no');
    btn.style.opacity = '0.4';
    
    setTimeout(() => {
        btn.style.opacity = '';
        btn.style.transform = '';
    }, 500);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        if (currentPage === totalPages) return;
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        prevPage();
    }
});

updateProgress();
