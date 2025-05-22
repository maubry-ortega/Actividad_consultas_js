/**
 * @file api.js
 * @description Módulo para interactuar con la API externa que provee la lista de candidatos.
 */

/**
 * Realiza una petición HTTP para obtener la lista de candidatos válidos desde una fuente remota.
 * Filtra automáticamente aquellos candidatos que no contienen la información mínima requerida:
 * nombre, apellido, foto y curso.
 *
 * @async
 * @function fetchCandidates
 * @returns {Promise<Array<Object>>} Retorna una promesa que resuelve en un arreglo de objetos candidatos.
 *                                  Cada objeto contiene al menos: nombre, apellido, foto y curso.
 * @throws {Error} Lanza un error si la petición falla o la respuesta no es válida.
 */
export async function fetchCandidates() {
  const CANDIDATES_API_URL = 'https://raw.githubusercontent.com/CesarMCuellarCha/Elecciones/refs/heads/main/candidatos.json';
  try {
    const response = await fetch(CANDIDATES_API_URL);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los candidatos');
    }
    const candidates = await response.json();

    // Filtrado riguroso para mantener solo candidatos con datos completos
    const validCandidates = candidates.filter(candidate => 
      candidate.nombre && candidate.apellido && candidate.foto && candidate.curso
    );

    return validCandidates;
  } catch (error) {
    console.error('Error al obtener candidatos:', error);
    throw error;
  }
}
