/**
 * Manejo de vistas para mostrar diferentes pantallas en la UI.
 */

/**
 * Muestra una vista específica con transición suave.
 * @param {HTMLElement} view - La vista a mostrar.
 */
export function showView(view) {
  const views = [
    document.getElementById('login_view'),
    document.getElementById('candidate_voting_view'),
    document.getElementById('results_view')
  ];
  views.forEach(v => {
    v.style.display = 'none';
    v.classList.remove('active');
  });
  view.style.display = 'block';
  setTimeout(() => view.classList.add('active'), 10);
}