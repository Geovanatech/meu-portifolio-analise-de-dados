/**
 * PORTFÓLIO GEOVANA - SCRIPT PRINCIPAL
 * 
 * Funcionalidades:
 * - Alternância de tema (dark/light) com persistência em localStorage
 * - Menu hamburger responsivo para mobile
 * - Gerenciamento de acessibilidade (aria-labels, aria-expanded)
 * - Microinterações suaves
 * - Fechamento automático do menu ao navegar
 */

// ============================================================
// 1. INICIALIZAÇÃO E SELETORES DO DOM
// ============================================================

const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('main-nav-links');
const html = document.documentElement;

// ============================================================
// 2. GERENCIAMENTO DE TEMA
// ============================================================

/**
 * Carrega o tema salvo no localStorage ou usa 'dark' como padrão
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

/**
 * Define o tema e atualiza o atributo data-theme do HTML
 * @param {string} theme - 'dark' ou 'light'
 */
function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggleLabel(theme);
}

/**
 * Alterna entre temas dark e light
 */
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Feedback visual: pequena rotação no ícone
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
}

/**
 * Atualiza o label aria do botão de tema
 * @param {string} theme - tema atual
 */
function updateThemeToggleLabel(theme) {
    const label = theme === 'dark' 
        ? 'Alternar para tema claro' 
        : 'Alternar para tema escuro';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
}

// ============================================================
// 3. GERENCIAMENTO DO MENU MOBILE
// ============================================================

/**
 * Abre ou fecha o menu mobile
 */
function toggleMenu() {
    const isActive = navLinks.classList.contains('active');
    
    if (isActive) {
        closeMenu();
    } else {
        openMenu();
    }
}

/**
 * Abre o menu mobile com animação
 */
function openMenu() {
    navLinks.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar Menu');
}

/**
 * Fecha o menu mobile com animação
 */
function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir Menu');
}

/**
 * Fecha o menu ao clicar em um link (apenas em mobile)
 */
function handleNavLinkClick() {
    // Verifica se está em tela pequena (mobile)
    if (window.innerWidth < 768) {
        // Aguarda um pouco para a transição suave
        setTimeout(() => {
            closeMenu();
        }, 300);
    }
}

// ============================================================
// 4. EVENT LISTENERS
// ============================================================

// Alternância de tema
themeToggle.addEventListener('click', toggleTheme);

// Menu hamburger
menuToggle.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
});

// Fechar menu ao redimensionar a janela (se voltar para desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Fechar menu ao clicar fora dele (UX melhorada)
document.addEventListener('click', (e) => {
    const isClickInsideNav = navLinks.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// ============================================================
// 5. INICIALIZAÇÃO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Inicializa aria-expanded do menu
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Log de inicialização (opcional, para debug)
    console.log('✓ Portfólio Geovana carregado com sucesso');
});

// ============================================================
// 6. UTILIDADES ADICIONAIS
// ============================================================

/**
 * Função auxiliar para detectar se está em mobile
 * @returns {boolean}
 */
function isMobile() {
    return window.innerWidth < 768;
}

/**
 * Função para scroll suave para seções (complemento ao scroll-behavior: smooth do CSS)
 * @param {string} sectionId - ID da seção
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeMenu(); // Fecha o menu após navegar
    }
}
