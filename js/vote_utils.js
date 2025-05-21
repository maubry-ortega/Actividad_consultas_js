/**
 * Utilidades para manejar el registro de votos.
 */

/**
 * Registra un voto para un candidato en localStorage.
 * @param {string} candidateId - Identificador único del candidato.
 * @returns {void}
 */
export function registerVote(candidateId) {
  const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
  storedVotes[candidateId] = (storedVotes[candidateId] || 0) + 1;
  localStorage.setItem('votes', JSON.stringify(storedVotes));
}