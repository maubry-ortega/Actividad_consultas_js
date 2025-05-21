/**
 * Renderiza dinámicamente las tarjetas de candidatos.
 * @param {Array} candidates - Lista de candidatos.
 * @param {Function} onVote - Callback al hacer clic.
 */
export function renderCandidates(candidates, onVote) {
  const container = document.getElementById('candidatesContainer');
  container.innerHTML = '';

  candidates.forEach(candidate => {
    const card = document.createElement('div');
    card.className = 'candidateCard';
    card.innerHTML = `
      <h3>${candidate.nombre} ${candidate.apellido}</h3>
      <p><strong>${candidate.curso}</strong></p>
      <img src="${candidate.foto}" alt="Foto de ${candidate.nombre}">
      <p>Aprendiz: ${candidate.nombre.toUpperCase()}</p>
      <p>Ficha: ${candidate.ficha ?? 'N/A'}</p>
    `;
    card.addEventListener('click', () => onVote(candidate));
    container.appendChild(card);
  });
}
