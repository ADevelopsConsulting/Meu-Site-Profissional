// Inicializar EmailJS com seu User ID
emailjs.init('SEU_USER_ID'); // Substitua por seu USER_ID do EmailJS

// Função para mostrar o modal
function showModal(message, type = 'success') {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const modalContent = modal.querySelector('.modal-content');

  modalMessage.textContent = message;
  modalContent.classList.remove('success', 'error');
  modalContent.classList.add(type);
  modal.classList.add('show');
}

// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Scroll Animations
const animateElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
animateElements.forEach((el) => observer.observe(el));

// Form Validation and Submission with reCAPTCHA
const form = document.getElementById('contato-form');
const submitButton = document.getElementById('submit-button');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Validação
  if (!nome || !email || !mensagem) {
    showModal('Por favor, preencha todos os campos.', 'error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showModal('Por favor, insira um e-mail válido.', 'error');
    return;
  }

  // Ativar estado de loading
  submitButton.classList.add('loading');
  submitButton.disabled = true;

  // Obter token do reCAPTCHA
  grecaptcha.ready(async () => {
    try {
      const token = await grecaptcha.execute('SUA_CHAVE_DO_SITE', { action: 'submit' });

      // Enviar dados via EmailJS
      const response = await emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', {
        nome,
        email,
        mensagem,
        to_email: 'seu-email@exemplo.com', // Substitua pelo seu e-mail
        recaptcha_token: token,
      });

      showModal('Formulário enviado com sucesso! Você receberá a mensagem em breve.', 'success');
      form.reset();
    } catch (error) {
      console.error('Erro:', error);
      showModal('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.', 'error');
    } finally {
      // Desativar estado de loading
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  });
});

// Fechar modal ao clicar no "X"
document.getElementById('modal-close').addEventListener('click', closeModal);

// Fechar modal ao clicar fora
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal')) {
    closeModal();
  }
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});