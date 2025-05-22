/**
 * @file ui.js
 * @description Módulo de interfaz para renderizar tarjetas interactivas de candidatos.
 */

/**
 * Renderiza las tarjetas de candidatos en el contenedor designado.
 * Cada tarjeta es accesible, actuando como botón, y maneja eventos de click y teclado para votar.
 * 
 * @param {Array<Object>} candidates - Arreglo de objetos con información de cada candidato.
 * @param {Function} onVote - Callback que se invoca al seleccionar un candidato (click o teclado).
 * 
 * Cada objeto candidato debe contener al menos las propiedades:
 * - nombre {string}
 * - apellido {string}
 * - curso {string}
 * - foto {string} URL de la imagen del candidato
 * - ficha {string} (opcional) número de ficha del aprendiz
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

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onVote(candidate);
      }
    });

    container.appendChild(card);
  });
}
