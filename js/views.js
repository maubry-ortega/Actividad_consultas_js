/**
 * @file views.js
 * @description Manejo centralizado de vistas de la aplicación.
 * Permite mostrar diferentes pantallas en la interfaz de usuario con transiciones suaves.
 */

/**
 * Muestra una vista específica de la aplicación.
 *
 * Esta función oculta todas las vistas registradas (login, votación y resultados)
 * y luego muestra la vista indicada mediante un efecto de transición.
 *
 * @param {HTMLElement} view - Elemento HTML de la vista que se desea mostrar.
 * Debe ser uno de: login_view, candidate_voting_view, results_view.
 *
 * @example
 * // Mostrar la vista de votación:
 * const votingView = document.getElementById('candidate_voting_view');
 * showView(votingView);
 */
export function showView(view) {
  /** @type {HTMLElement[]} Todas las vistas disponibles en la interfaz */
  const views = [
    document.getElementById('login_view'),
    document.getElementById('candidate_voting_view'),
    document.getElementById('results_view')
  ];

  // Ocultar todas las vistas activas
  views.forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active');
  });

  // Mostrar la vista deseada con efecto visual
  view.style.display = 'block';
  setTimeout(() => view.classList.add('active'), 10);
}