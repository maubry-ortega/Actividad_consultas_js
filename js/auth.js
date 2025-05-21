/**
 * Valida si el usuario ingresado es el administrador autorizado.
 * @param {string} username - Usuario.
 * @param {string} password - Contraseña.
 * @returns {Promise<boolean>} True si las credenciales son válidas.
 */
export async function authenticateAdmin(username, password) {
  const response = await fetch('https://raw.githubusercontent.com/CesarMCuellarCha/Elecciones/refs/heads/main/administrador.json');
  const adminData = await response.json();
  return username === adminData.username && password === adminData.password;
}
