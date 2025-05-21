/**
 * Lógica para manejar candidatos y votación.
 */
import { fetchCandidates } from './api.js';
import { renderCandidates } from './ui.js';
import { registerVote } from './vote_utils.js';
import { FichaManager } from './ficha_manager.js';

const fichaManager = new FichaManager();

/**
 * Carga y muestra los candidatos desde la API.
 * @param {Function} voteCallback - Función de manejo de voto.
 * @returns {Promise<Array>} Lista de candidatos
 */
export async function loadCandidates(voteCallback) {
  const loadingContainer = document.getElementById('loading_container');
  const candidatesContainer = document.getElementById('candidates_container');
  try {
    loadingContainer.style.display = 'block';
    candidatesContainer.style.display = 'none';
    const allCandidates = await fetchCandidates();
    if (!allCandidates || allCandidates.length === 0) {
      throw new Error('No se encontraron candidatos');
    }
    loadingContainer.style.display = 'none';
    candidatesContainer.style.display = 'grid';
    renderCandidates(allCandidates, voteCallback);
    return allCandidates;
  } catch (error) {
    console.error('Error al cargar candidatos:', error);
    loadingContainer.style.display = 'none';
    candidatesContainer.style.display = 'block';
    Swal.fire({
      title: 'Error',
      text: 'No se pudieron cargar los candidatos.',
      icon: 'error'
    });
    return [];
  }
}

/**
 * Maneja el proceso de votación para un candidato.
 * @param {Object} candidate - Candidato seleccionado.
 * @returns {void}
 */
export function handleVote(candidate) {
  Swal.fire({
    title: `¿Votar por ${candidate.nombre} ${candidate.apellido}?`,
    text: candidate.curso,
    imageUrl: candidate.foto,
    imageHeight: 150,
    input: 'text',
    inputLabel: 'Número de ficha',
    inputPlaceholder: 'Ej: 12345',
    showCancelButton: true,
    confirmButtonText: 'Siguiente',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) return 'Debes ingresar la ficha';
      if (!/^\d+$/.test(value)) return 'La ficha debe ser numérica';
      return null;
    }
  }).then(result => {
    if (result.isConfirmed) {
      const ficha = result.value;
      Swal.fire({
        title: 'Ingrese su nombre',
        input: 'text',
        inputLabel: 'Nombre completo',
        inputPlaceholder: 'Ej: Juan Pérez',
        showCancelButton: true,
        confirmButtonText: 'Votar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) return 'Debes ingresar tu nombre';
          const votedUsers = JSON.parse(localStorage.getItem('voted_users')) || [];
          if (votedUsers.some(user => user.ficha === ficha && user.name === value)) {
            return 'Este aprendiz ya votó';
          }
          return null;
        }
      }).then(nameResult => {
        if (nameResult.isConfirmed) {
          const name = nameResult.value;
          if (!fichaManager.nombreExists(ficha, name)) {
            fichaManager.addNombre(ficha, name);
          }
          registerVote(`${candidate.nombre} ${candidate.apellido}`);
          const votedUsers = JSON.parse(localStorage.getItem('voted_users')) || [];
          votedUsers.push({ ficha, name });
          localStorage.setItem('voted_users', JSON.stringify(votedUsers));
          Swal.fire({ title: '¡Voto registrado!', icon: 'success' });
        }
      });
    }
  });
}