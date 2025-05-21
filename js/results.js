/**
 * Generación y visualización de los resultados de la elección.
 */
export function showResults(allCandidates) {
  const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
  const resultsContainer = document.getElementById('results_container');
  const candidateVotingView = document.getElementById('candidate_voting_view');
  const resultsView = document.getElementById('results_view');
  const resultsChartCanvas = document.getElementById('results_chart');

  const resultHtml = allCandidates
    .map(candidate => {
      const id = `${candidate.nombre} ${candidate.apellido}`;
      const count = storedVotes[id] || 0;
      return `<p><strong>${id}</strong>: ${count} votos</p>`;
    })
    .join('');
  resultsContainer.innerHTML = resultHtml || '<p>No se han registrado candidatos.</p>';

  const labels = allCandidates.map(c => `${c.nombre} ${c.apellido}`);
  const data = allCandidates.map(c => storedVotes[`${c.nombre} ${c.apellido}`] || 0);

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

  candidateVotingView.style.display = 'none';
  resultsView.style.display = 'block';
  setTimeout(() => resultsView.classList.add('active'), 10);

  localStorage.removeItem('votes');
  localStorage.removeItem('voted_users');
}