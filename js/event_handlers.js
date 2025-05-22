/**
 * @file event_handlers.js
 * @description Configura y gestiona todos los eventos de la interfaz de la aplicación de votaciones.
 */

import { authenticateAdmin } from './auth.js';
import { loadCandidates, handleVote } from './voting_logic.js';
import { showView } from './views.js';
import { showResults } from './results.js';

/**
 * Almacena la lista de candidatos cargados después del inicio de sesión.
 * @type {Array<Object>}
 */
let allCandidates = [];

/**
 * Configura los manejadores de eventos de la aplicación:
 * - Login del administrador
 * - Cierre de elecciones
 * - Regreso al login
 * 
 * Este método debe llamarse una vez al iniciar la aplicación.
 * 
 * @function
 * @returns {void}
 */
export function setupEventHandlers() {
  /** @type {HTMLFormElement} Formulario de inicio de sesión del administrador */
  const adminLoginForm = document.getElementById('admin_login_form');

  /** @type {HTMLElement} Vista de votación de candidatos */
  const candidateVotingView = document.getElementById('candidate_voting_view');

  /** @type {HTMLElement} Elemento que muestra el estado de la elección */
  const electionStatus = document.getElementById('election_status');

  /** @type {HTMLButtonElement} Botón para cerrar la elección */
  const closeElectionBtn = document.getElementById('close_election_btn');

  /** @type {HTMLButtonElement} Botón para volver a la vista de login */
  const backToLoginBtn = document.getElementById('back_to_login_btn');

  /** @type {HTMLElement} Vista de inicio de sesión */
  const loginView = document.getElementById('login_view');

  /**
   * Manejador del envío del formulario de login.
   * Autentica al administrador y muestra la vista de votación si tiene acceso.
   */
  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    /** @type {string} Nombre de usuario ingresado */
    const username = document.getElementById('username_input').value.trim();

    /** @type {string} Contraseña ingresada */
    const password = document.getElementById('password_input').value.trim();

    try {
      const isAdmin = await authenticateAdmin(username, password);
      if (isAdmin) {
        Swal.fire({ 
          title: 'Bienvenido', 
          text: 'Inicio de sesión exitoso', 
          icon: 'success' 
        });

        electionStatus.textContent = 'Estado: Abierto';
        electionStatus.style.backgroundColor = '#2ecc71';

        showView(candidateVotingView);
        allCandidates = await loadCandidates(handleVote);
      } else {
        Swal.fire({ 
          title: 'Error', 
          text: 'Credenciales incorrectas.', 
          icon: 'error' 
        });
      }
    } catch (error) {
      Swal.fire({ 
        title: 'Error', 
        text: 'Error de conexión.', 
        icon: 'error' 
      });
    }
  });

  /**
   * Manejador para el botón de cierre de elecciones.
   * Confirma con el usuario y luego muestra los resultados.
   */
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

  /**
   * Manejador para volver a la vista de login desde la vista de votación.
   * Restaura el estado inicial de la elección.
   */
  backToLoginBtn.addEventListener('click', () => {
    electionStatus.textContent = 'Estado: No iniciado';
    electionStatus.style.backgroundColor = '#e74c3c';
    showView(loginView);
  });
}