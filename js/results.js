/**
 * @file results.js
 * @description Módulo encargado de generar y mostrar los resultados finales de la elección,
 * tanto en formato textual como gráfico, y limpiar datos temporales almacenados localmente.
 */

 /**
  * Genera y despliega la visualización de los resultados electorales.
  * 
  * Esta función extrae los votos almacenados localmente, construye un resumen
  * en texto con la cantidad de votos por candidato y genera un gráfico de barras
  * que muestra visualmente estos resultados. Finalmente, alterna la visibilidad
  * de las vistas para mostrar los resultados y limpia los datos temporales del localStorage.
  * 
  * @function showResults
  * @param {Array<Object>} allCandidates - Arreglo con los datos de todos los candidatos.
  *        Cada objeto debe contener las propiedades `nombre` y `apellido`.
  * @returns {void}
  */
export function showResults(allCandidates) {
  const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
  const resultsContainer = document.getElementById('results_container');
  const candidateVotingView = document.getElementById('candidate_voting_view');
  const resultsView = document.getElementById('results_view');
  const resultsChartCanvas = document.getElementById('results_chart');

  // Construcción del resumen textual de resultados
  const resultHtml = allCandidates
    .map(candidate => {
      const id = `${candidate.nombre} ${candidate.apellido}`;
      const count = storedVotes[id] || 0;
      return `<p><strong>${id}</strong>: ${count} votos</p>`;
    })
    .join('');

  resultsContainer.innerHTML = resultHtml || '<p>No se han registrado candidatos.</p>';

  // Preparación de datos para gráfico
  const labels = allCandidates.map(c => `${c.nombre} ${c.apellido}`);
  const data = allCandidates.map(c => storedVotes[`${c.nombre} ${c.apellido}`] || 0);

  // Creación del gráfico de barras con Chart.js
  new Chart(resultsChartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Votos',
        data: data,
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Número de Votos' }
        },
        x: {
          title: { display: true, text: 'Candidatos' }
        }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Resultados de la Elección' }
      }
    }
  });

  // Mostrar resultados y ocultar vista de votación
  candidateVotingView.style.display = 'none';
  resultsView.style.display = 'block';
  setTimeout(() => resultsView.classList.add('active'), 10);

  // Limpieza de datos temporales para evitar duplicados o inconsistencias futuras
  localStorage.removeItem('votes');
  localStorage.removeItem('voted_users');
}
