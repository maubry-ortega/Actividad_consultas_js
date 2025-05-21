/**
 * Gestión dinámica de fichas y nombres de aprendices.
 */

/**
 * Clase para manejar la estructura dinámica de fichas.
 */
export class FichaManager {
  #fichas;

  /**
   * Inicializa el gestor de fichas, cargando desde localStorage si existe.
   */
  constructor() {
    this.#fichas = new Map(JSON.parse(localStorage.getItem('fichas')) || []);
  }

  /**
   * Obtiene o crea una ficha con su arreglo de nombres.
   * @param {string} fichaId - Identificador de la ficha.
   * @returns {Array<{nombre: string}>} Arreglo de nombres de la ficha.
   */
  getOrCreateFicha(fichaId) {
    if (!this.#fichas.has(fichaId)) {
      this.#fichas.set(fichaId, []);
      this.#save();
    }
    return this.#fichas.get(fichaId);
  }

  /**
   * Agrega un nombre a una ficha si no existe.
   * @param {string} fichaId - Identificador de la ficha.
   * @param {string} nombre - Nombre a agregar.
   * @returns {boolean} Verdadero si se agregó, falso si ya existía.
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
   * Verifica si un nombre existe en una ficha.
   * @param {string} fichaId - Identificador de la ficha.
   * @param {string} nombre - Nombre a verificar.
   * @returns {boolean} Verdadero si el nombre existe en la ficha.
   */
  nombreExists(fichaId, nombre) {
    const nombres = this.#fichas.get(fichaId) || [];
    return nombres.some(item => item.nombre === nombre);
  }

  /**
   * Guarda las fichas en localStorage.
   * @private
   */
  #save() {
    localStorage.setItem('fichas', JSON.stringify([...this.#fichas]));
  }
}