/**
 * Módulo principal para manejar la lógica inicial de la aplicación de elecciones.
 */
import { showView } from './views.js';
import { setupEventHandlers } from './event_handlers.js';

/**
 * Inicializa la aplicación al cargar el DOM.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('login_view');
  loginView.classList.add('active');
  setupEventHandlers();
});