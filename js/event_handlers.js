/**
 * Maneja los eventos de la aplicación.
 */
import { authenticateAdmin } from './auth.js';
import { loadCandidates, handleVote } from './handlers.js';
import { showView } from './views.js';
import { showResults } from './results.js';

let allCandidates = [];

/**
 * Configura los manejadores de eventos.
 * @returns {void}
 */
export function setupEventHandlers() {
  const adminLoginForm = document.getElementById('admin_login_form');
  const candidateVotingView = document.getElementById('candidate_voting_view');
  const electionStatus = document.getElementById('election_status');
  const closeElectionBtn = document.getElementById('close_election_btn');
  const backToLoginBtn = document.getElementById('back_to_login_btn');
  const loginView = document.getElementById('login_view');

  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username_input').value.trim();
    const password = document.getElementById('password_input').value.trim();
    try {
      const isAdmin = await authenticateAdmin(username, password);
      if (isAdmin) {
        Swal.fire({ title: 'Bienvenido', text: 'Inicio de sesión exitoso', icon: 'success' });
        electionStatus.textContent = 'Estado: Abierto';
        electionStatus.style.backgroundColor = '#2ecc71';
        showView(candidateVotingView);
        allCandidates = await loadCandidates(handleVote);
      } else {
        Swal.fire({ title: 'Error', text: 'Credenciales incorrectas.', icon: 'error' });
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Error de conexión.', icon: 'error' });
    }
  });

  closeElectionBtn.addEventListener('click', () => {
    Swal.fire({
      title: '¿Cerrar elecciones?',
      text: 'Esta acción mostrará los resultados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        electionStatus.textContent = 'Estado: Cerrado';
        electionStatus.style.backgroundColor = '#e74c3c';
        showResults(allCandidates);
      }
    });
  });

  backToLoginBtn.addEventListener('click', () => {
    electionStatus.textContent = 'Estado: No iniciado';
    electionStatus.style.backgroundColor = '#e74c3c';
    showView(loginView);
  });
}