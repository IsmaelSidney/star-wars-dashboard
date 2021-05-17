const personagensCounter = document.getElementById('personagens');
const luasCounter = document.getElementById('luas');
const planetasCounter = document.getElementById('planetas');
const navesCounter = document.getElementById('naves');

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
    const response = await swapiGet("vehicles/");
    const vehiclesArray = response.data.results;

    console.log(vehiclesArray)
    const dataArray = [];
    dataArray.push(["veiculos", "Passageiros"]);
    vehiclesArray.forEach((vehicle) => {
        dataArray.push([vehicle.name, Number(vehicle.passengers)])
    })
    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: 'Maiores Veiculos',
        legend: 'none'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}


preencherCounters();
preencherTabela();

function preencherCounters() {

    Promise.all([swapiGet("people/"), swapiGet("vehicles/"), swapiGet("planets/"), swapiGet("starships/")])
        .then(function(results) {
            personagensCounter.innerHTML = results[0].data.count;
            luasCounter.innerHTML = results[1].data.count;
            planetasCounter.innerHTML = results[2].data.count;
            navesCounter.innerHTML = results[3].data.count;
        });
}

async function preencherTabela() {
    const response = await swapiGet("films/");
    const tableData = response.data.results;
    tableData.forEach(film => {
        $("#filmsTable").append(`<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
        </tr>`);

    });
}

function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`)
}