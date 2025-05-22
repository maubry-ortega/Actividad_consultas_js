/**
 * @file main.js
 * @description Módulo principal que inicializa la aplicación de simulación de elecciones.
 * Se encarga de configurar la vista inicial y enlazar los manejadores de eventos.
 */

import { setupEventHandlers } from './event_handlers.js';

/**
 * Inicializa la aplicación una vez que el DOM esté completamente cargado.
 *
 * Activa la vista de inicio de sesión y configura todos los manejadores de eventos necesarios
 * para el flujo de la aplicación.
 *
 * @event DOMContentLoaded
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('login_view');
  loginView.classList.add('active');
  setupEventHandlers(); 
});