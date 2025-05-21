/**
 * Obtiene la lista de candidatos desde la API.
 * @returns {Promise<Array>} Lista de candidatos.
 */
export async function fetchCandidates() {
  const response = await fetch('https://raw.githubusercontent.com/CesarMCuellarCha/Elecciones/refs/heads/main/candidatos.json');
  return await response.json();
}
