/**
 * Módulo de API para obtener datos de candidatos.
 */

/**
 * Obtiene la lista de candidatos desde la API y agrega un candidato en blanco.
 * @returns {Promise<Array>} Lista de candidatos, incluyendo el candidato en blanco.
 */
export async function fetchCandidates() {
  const CANDIDATES_API_URL = 'https://raw.githubusercontent.com/CesarMCuellarCha/Elecciones/refs/heads/main/candidatos.json';
  try {
    const response = await fetch(CANDIDATES_API_URL);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los candidatos');
    }
    const candidates = await response.json();
    const validCandidates = candidates.filter(candidate => 
      candidate.nombre && candidate.apellido && candidate.foto && candidate.curso
    );
    return validCandidates;
  } catch (error) {
    console.error('Error al obtener candidatos:', error);
    throw error;
  }
}