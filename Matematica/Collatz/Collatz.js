const lineChartElement = document.getElementById("line-chart"),
  imgElement = document.getElementById("img");

lineChartElement.style.display = "none";

const dati = {
  labels: [],
  datasets: [
    {
      label: "Dati Collatz",
      borderWidth: 1,
      backgroundColor:["blue"],
      borderColor: ["blue"],
      data: [],
    },
  ],
};

let myChart = null;

function CalcolaCollatz() {
  const numero = parseInt(document.getElementById("numero").value);

  if (isNaN(numero) || numero <= 0 || numero === "") {
    document.getElementById("passaggi").innerHTML = "";
    document.getElementById("risultato").innerHTML =
      "Inserisci un numero valido";
    lineChartElement.style.display = "none";
    imgElement.style.display = "block";
  } else {
    lineChartElement.style.display = "block";
    imgElement.style.display = "none";

    const risultato = CalcolaRisultato(numero);
    document.getElementById("risultato").innerHTML = `K ---> ${risultato}`;
  }
}

function CalcolaRisultato(numero) {
  dati.labels = [];
  dati.datasets[0].data = [];

  let k = 0,
    passaggi = 0,
    stampaHTML = "";

  dati.labels.push(passaggi);
  dati.datasets[0].data.push(numero);

  while (numero > 1) {
    passaggi++;
    stampaHTML += ` ${numero} --> `;

    if (passaggi % 4 === 0) stampaHTML += "<br>";

    numero = numero % 2 === 0 ? numero / 2 : 3 * numero + 1;
    k++;

    dati.labels.push(passaggi);
    dati.datasets[0].data.push(numero);
  }

  stampaHTML += " 1";
  stampaHTML += "<br><br>";

  document.getElementById("passaggi").innerHTML = stampaHTML;

  if (myChart) myChart.destroy();

  const config = {
      type: "line",
      data: dati,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    },
    ctx = lineChartElement.getContext("2d");
  myChart = new Chart(ctx, config);

  imgElement.style.display = "none";

  return k;
}
