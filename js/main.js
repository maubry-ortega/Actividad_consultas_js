import { authenticateAdmin } from './auth.js';
import { fetchCandidates } from './api.js';
import { renderCandidates } from './ui.js';

/**
 * Inicializa los eventos al cargar el DOM.
 * Maneja el inicio de sesión del administrador y la visualización de vistas.
 */
document.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLFormElement} */
  const loginForm = document.getElementById('loginForm');

  /** @type {HTMLElement} */
  const loginView = document.getElementById('loginView');

  /** @type {HTMLElement} */
  const votingView = document.getElementById('votingView');

  /** @type {HTMLButtonElement} */
  const closeElectionBtn = document.getElementById('closeElectionBtn');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    /** @type {string} */
    const username = document.getElementById('usernameInput').value.trim();

    /** @type {string} */
    const password = document.getElementById('passwordInput').value.trim();

    const isAdmin = await authenticateAdmin(username, password);
    if (isAdmin) {
      Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success');
      loginView.style.display = 'none';
      votingView.style.display = 'block';
      loadCandidates();
    } else {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }
  });

  closeElectionBtn.addEventListener('click', () => {
    Swal.fire('Elecciones cerradas', 'Gracias por participar', 'info');
  });
});

/**
 * Carga y muestra los candidatos desde la API.
 * Llama a `renderCandidates` con los datos obtenidos.
 * 
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function loadCandidates() {
  const candidates = await fetchCandidates();
  renderCandidates(candidates, handleVote);
}

/**
 * Muestra una ventana de confirmación para votar por un candidato.
 * 
 * @function
 * @param {Object} candidate - Candidato seleccionado.
 * @param {string} candidate.nombre - Nombre del candidato.
 * @param {string} candidate.curso - Curso al que pertenece el candidato.
 * @param {string} candidate.foto - URL de la foto del candidato.
 * @returns {void}
 */
function handleVote(candidate) {
  Swal.fire({
    title: `¿Estás seguro de votar por ${candidate.nombre}?`,
    text: candidate.curso,
    imageUrl: candidate.foto,
    imageHeight: 150,
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire('¡Voto registrado!', '', 'success');
    }
  });
}
