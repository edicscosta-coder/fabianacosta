/* ========================================================
   FABIANA COSTA - NEUROPSICOPEDAGOGA
   Scripts de Interatividade, Triagem e Conversão (Sales Page)
   Número de Contato: (75) 92001-4219
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initFaqAccordion();
    initQuizCounter();
    initWhatsAppTooltip();
});

// 1. MENU MOBILE TOGGLE
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileBtn || !mobileMenu) return;

    mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });
}

// 2. NAVBAR SCROLL SHADOW
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('shadow-md', 'bg-white/95');
            navbar.classList.remove('bg-white/90');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95');
            navbar.classList.add('bg-white/90');
        }
    });
}

// 3. FAQ ACCORDION
function initFaqAccordion() {
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isOpen = !content.classList.contains('hidden');

            // Fechar outros itens abertos para manter clean
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-btn').forEach(b => {
                b.classList.remove('active');
                const i = b.querySelector('.faq-icon');
                if (i) i.style.transform = 'rotate(0deg)';
            });

            if (!isOpen) {
                content.classList.remove('hidden');
                btn.classList.add('active');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// 4. FERRAMENTA INTERATIVA DE TRIAGEM RÁPIDA (QUIZ)
function initQuizCounter() {
    const checkboxes = document.querySelectorAll('.quiz-checkbox');
    const selectedCountEl = document.getElementById('selected-count');
    const resultTitleEl = document.getElementById('result-title');
    const resultDescEl = document.getElementById('result-desc');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateQuizState();
        });
    });

    function updateQuizState() {
        const checked = document.querySelectorAll('.quiz-checkbox:checked');
        const count = checked.length;
        if (selectedCountEl) selectedCountEl.textContent = count;

        if (count === 0) {
            resultTitleEl.textContent = 'Selecione as opções acima para ver a orientação recomendada';
            resultDescEl.textContent = 'Identificar esses sinais precocemente é o ato de amor e cuidado mais importante para garantir um futuro de autonomia.';
        } else if (count >= 1 && count <= 2) {
            resultTitleEl.innerHTML = '🔍 <span class="text-yellow-300">Sinais Pontuais Detectados</span>';
            resultDescEl.textContent = 'Identificamos alguns pontos de atenção no dia a dia. Uma conversa diagnóstica pode esclarecer se são apenas fases adaptativas ou sinais que precisam de estimulação precoce.';
        } else if (count >= 3 && count <= 4) {
            resultTitleEl.innerHTML = '⚠️ <span class="text-amber-400">Indicadores Moderados de Dificuldade</span>';
            resultDescEl.textContent = 'Atenção: Esses sinais afetam diretamente a autoestima e o rendimento escolar ou profissional. Uma avaliação com Fabiana Costa trará clareza imediata e um plano seguro.';
        } else {
            resultTitleEl.innerHTML = '🚨 <span class="text-rose-400">Múltiplos Sinais de Comorbidade ou Neurodivergência</span>';
            resultDescEl.textContent = 'Alerta Prioritário: Múltiplos sinais compatíveis com Autismo (TEA), TDAH ou bloqueios graves de alfabetização. Não postergue: a intervenção precoce transforma o futuro!';
        }
    }
}

// 5. ENVIAR RESPOSTAS DO QUIZ DIRETO PARA O WHATSAPP
function sendQuizToWhatsApp() {
    const checked = document.querySelectorAll('.quiz-checkbox:checked');
    const phone = '5575920014219'; // Número oficial de Fabiana Costa

    if (checked.length === 0) {
        alert('Por favor, selecione ao menos 1 sinal observado acima para enviar a mensagem formatada para a Dra. Fabiana Costa no WhatsApp.');
        return;
    }

    let message = 'Olá, Dra. Fabiana Costa! 👋\n\nFiz a autoavaliação no seu site e identifiquei os seguintes sinais no dia a dia:\n\n';

    checked.forEach((item, index) => {
        message += `${index + 1}. 📌 ${item.value}\n`;
    });

    message += '\nGostaria de entender melhor como funciona a avaliação neuropsicopedagógica e agendar uma consulta inicial com você!';

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// 6. WHATSAPP FLOATING TOOLTIP
function initWhatsAppTooltip() {
    const popup = document.getElementById('wa-bubble-popup');
    if (!popup) return;

    // Exibe após 3.5 segundos para chamar atenção amigável
    setTimeout(() => {
        popup.classList.remove('hidden');
    }, 3500);

    // Oculta ao clicar no botão do WhatsApp
    const waLink = popup.parentElement.querySelector('a');
    if (waLink) {
        waLink.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
}
