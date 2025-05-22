/**
 * @file vote_utils.js
 * @description Utilidades para registrar y manejar votos en almacenamiento local (localStorage).
 */

/**
 * Incrementa en 1 el conteo de votos para un candidato identificado por su ID único.
 * 
 * Esta función lee el objeto 'votes' almacenado en localStorage, actualiza el contador 
 * para el candidato especificado y guarda el resultado actualizado. Si el candidato no tiene 
 * votos previos, inicia el conteo en 1.
 *
 * @param {string} candidateId - Identificador único del candidato (por ejemplo, "Nombre Apellido").
 * @returns {void} No retorna valor.
 */
export function registerVote(candidateId) {
  const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
  storedVotes[candidateId] = (storedVotes[candidateId] || 0) + 1;
  localStorage.setItem('votes', JSON.stringify(storedVotes));
}