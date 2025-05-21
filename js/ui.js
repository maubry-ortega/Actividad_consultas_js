/**
 * Módulo de interfaz de usuario para renderizar tarjetas de candidatos.
 */

/**
 * Renderiza dinámicamente las tarjetas de candidatos.
 * @param {Array} candidates - Lista de candidatos.
 * @param {Function} onVote - Función de callback para la acción de votar.
 */
export function renderCandidates(candidates, onVote) {
  const container = document.getElementById('candidates_container');
  container.innerHTML = '';
  candidates.forEach(candidate => {
    const card = document.createElement('div');
    card.className = 'candidate-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Votar por ${candidate.nombre} ${candidate.apellido}`);
    const isBlankVote = candidate.nombre === 'Voto' && candidate.apellido === 'en Blanco';
    card.innerHTML = `
      <h3>${candidate.nombre} ${candidate.apellido}</h3>
      <p><strong>${candidate.curso}</strong></p>
      <img src="${candidate.foto}" alt="Foto de ${candidate.nombre} ${candidate.apellido}">
      <p>Aprendiz: ${candidate.nombre.toUpperCase()}</p>
      <p>Ficha: ${candidate.ficha ?? 'N/A'}</p>
      <span class="badge ${isBlankVote ? 'badge-blank' : ''}">${isBlankVote ? 'Voto en Blanco' : candidate.curso}</span>
    `;
    card.addEventListener('click', () => onVote(candidate));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onVote(candidate);
      }
    });
    container.appendChild(card);
  });
}