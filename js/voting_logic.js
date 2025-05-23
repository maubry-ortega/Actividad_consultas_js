/**
 * @file voting_logic.js
 * @description Lógica principal para cargar candidatos y manejar el proceso de votación
 * dentro del simulador de elecciones de aprendices.
 */

import { fetchCandidates } from './api.js';
import { renderCandidates } from './ui.js';
import { registerVote } from './vote_utils.js';
import { FichaManager } from './ficha_manager.js';

const fichaManager = new FichaManager();

/**
 * Carga y muestra los candidatos disponibles desde la API externa.
 * Se encarga de gestionar el estado de carga y errores visuales.
 *
 * @async
 * @function loadCandidates
 * @param {Function} voteCallback - Función que se invoca al hacer clic en el botón de votar.
 * @returns {Promise<Array<Object>>} Arreglo de objetos candidato obtenidos desde la API.
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
 * Inicia el proceso de votación para un candidato específico.
 *
 * Solicita al usuario que confirme su intención de votar, luego pide su número de ficha
 * y nombre completo, y valida si ya ha votado previamente. Si todo es correcto,
 * registra el voto y lo guarda en `localStorage`.
 *
 * @function handleVote
 * @param {Object} candidate - Objeto del candidato seleccionado.
 * @param {string} candidate.nombre - Nombre del candidato.
 * @param {string} candidate.apellido - Apellido del candidato.
 * @param {string} candidate.curso - Curso del candidato.
 * @param {string} candidate.foto - URL de la foto del candidato.
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

          Swal.fire({
            title: '¡Voto registrado!',
            icon: 'success'
          });
        }
      });
    }
  });
}
