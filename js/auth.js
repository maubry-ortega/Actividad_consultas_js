/**
 * Módulo de autenticación para validar credenciales de administrador.
 */

/**
 * Valida si el usuario proporcionado es el administrador autorizado.
 * @param {string} username - Nombre de usuario ingresado.
 * @param {string} password - Contraseña ingresada.
 * @returns {Promise<boolean>} Verdadero si las credenciales son válidas, falso en caso contrario.
 */
export async function authenticateAdmin(username, password) {
  if (!username || !password) {
    return false;
  }
  const ADMIN_API_URL = 'https://raw.githubusercontent.com/CesarMCuellarCha/Elecciones/refs/heads/main/administrador.json';
  try {
    const response = await fetch(ADMIN_API_URL);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los datos del administrador');
    }
    const adminData = await response.json();
    return username === adminData.username && password === adminData.password;
  } catch (error) {
    console.error('Error al autenticar administrador:', error);
    return false;
  }
}