/**
 * @file auth.js
 * @description Módulo de autenticación para validar credenciales del administrador
 * a partir de un archivo remoto en formato JSON.
 */

/**
 * Valida si las credenciales proporcionadas corresponden al administrador autorizado.
 *
 * Realiza una solicitud HTTP para obtener los datos del administrador desde un archivo
 * JSON público. Luego compara el nombre de usuario y la contraseña ingresados por el usuario.
 *
 * @async
 * @function authenticateAdmin
 * @param {string} username - Nombre de usuario ingresado en el formulario.
 * @param {string} password - Contraseña ingresada en el formulario.
 * @returns {Promise<boolean>} `true` si las credenciales son válidas, `false` en cualquier otro caso.
 * 
 * @example
 * const isAdmin = await authenticateAdmin('admin', '1234');
 * if (isAdmin) {
 *   console.log('Acceso permitido');
 * } else {
 *   console.log('Acceso denegado');
 * }
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