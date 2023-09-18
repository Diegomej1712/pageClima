let apiKey = 'fdab9f7d8a324c57bdc152936233008';
const container = document.querySelector('.containerBody');
const inputLocation = document.querySelector('.inputLocation');
const buttonSubmit = document.querySelector('.buttonSubmit');

buttonSubmit.addEventListener('click', () => {
    const locationTemp = inputLocation.value.trim();
    if (locationTemp) 
    {
        getAPI(locationTemp);
    }
});

inputLocation.addEventListener('keydown', (event) => {
    if (event.key === 'Enter')
    {
        const locationTemp = inputLocation.value.trim();
        if (locationTemp) 
        {
            getAPI(locationTemp);
        }
    }
});

async function getAPI(locationTemp)
{
    try
    {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationTemp}&aqi=yes`);
        const data = await response.json();
        console.log(data);

        container.innerHTML = `
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="divContainer col-lg-5 card bg-secondary p-2 text-dark bg-opacity-50 d-flex justify-content-center align-items-center py-5 border-0">
                    <img class="w-25" src="${data.current.condition.icon}">
                    <label>${data.current.condition.text}</label>
                    <label>Ultima actualizacion: ${data.current.last_updated}</label>
                    <label>Humedad: ${data.current.humidity}g/m³</label>
                    <label>Rafagas de viento: ${data.current.gust_kph}km/h</label>
                    <label>Vientos estandard: ${data.current.wind_kph}km/h</label>
                    <label>Grados: ${data.current.temp_c}°C</label>
                    <label>Pais: ${data.location.country}, ${data.location.name}</label>
                    <label>Hora local: ${data.location.localtime}</label>
                </div>
                <div class="mapouter col-lg-7 card bg-secondary p-2 text-dark bg-opacity-50 d-flex justify-content-center align-items-center border-0">
                    <div class="gmap_canvas col d-flex justify-content-center align-items-center w-100 h-100 px-3 py-3"><iframe class="h-100 rounded-5 w-100" id="gmap_canvas"
                        src="https://maps.google.com/maps?q=2880%20${locationTemp}&t=k&z=4&ie=UTF8&iwloc=&output=embed" 
                        frameborder="0" scrolling="yes"></iframe>
                    </div>
                </div>       
            </div>
        </div>
        `;
    }
    catch (error)
    {
        console.error(error);
    }
}