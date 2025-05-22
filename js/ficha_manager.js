/**
 * @file ficha_manager.js
 * @description Clase para gestionar dinámicamente fichas y nombres de aprendices con persistencia en localStorage.
 */

export class FichaManager {
  #fichas;

  /**
   * Inicializa la instancia cargando las fichas existentes desde localStorage,
   * o creando una estructura vacía si no hay datos previos.
   */
  constructor() {
    this.#fichas = new Map(JSON.parse(localStorage.getItem('fichas')) || []);
  }

  /**
   * Obtiene el arreglo de nombres asociado a una ficha. Si la ficha no existe,
   * la crea automáticamente con un arreglo vacío y la persiste.
   * 
   * @param {string} fichaId - Identificador único de la ficha.
   * @returns {Array<{nombre: string}>} Lista de nombres registrados en la ficha.
   */
  getOrCreateFicha(fichaId) {
    if (!this.#fichas.has(fichaId)) {
      this.#fichas.set(fichaId, []);
      this.#save();
    }
    return this.#fichas.get(fichaId);
  }

  /**
   * Agrega un nuevo nombre a la ficha indicada, solo si aún no existe en la lista.
   * Guarda los cambios automáticamente.
   * 
   * @param {string} fichaId - Identificador de la ficha.
   * @param {string} nombre - Nombre del aprendiz a agregar.
   * @returns {boolean} `true` si el nombre fue agregado; `false` si ya existía.
   */
  addNombre(fichaId, nombre) {
    const nombres = this.getOrCreateFicha(fichaId);
    if (nombres.some(item => item.nombre === nombre)) {
      return false;
    }
    nombres.push({ nombre });
    this.#save();
    return true;
  }

  /**
   * Verifica si un nombre ya está registrado en la ficha indicada.
   * 
   * @param {string} fichaId - Identificador de la ficha.
   * @param {string} nombre - Nombre a verificar.
   * @returns {boolean} `true` si el nombre existe; `false` en caso contrario.
   */
  nombreExists(fichaId, nombre) {
    const nombres = this.#fichas.get(fichaId) || [];
    return nombres.some(item => item.nombre === nombre);
  }

  /**
   * Guarda el estado actual de fichas en localStorage.
   * 
   * @private
   */
  #save() {
    localStorage.setItem('fichas', JSON.stringify([...this.#fichas]));
  }
}
