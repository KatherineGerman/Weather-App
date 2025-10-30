const unsplashClientId = "V7rFAMwY1y_3MXHBcL8_8lUBuNZLnuHc_gl3GO6tPF0"; // reemplaza con tu Access Key de Unsplash

let weather = {
    apiKey: "e12e137d0e710f68d91744a683d4c85f",

    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((err) => console.error(err));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const timezoneOffset = data.timezone;

        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".icon").alt = description;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

        // Hora local AM/PM
        const localTime = new Date(Date.now() + timezoneOffset * 1000);
        let hours = localTime.getUTCHours();
        const minutes = localTime.getUTCMinutes().toString().padStart(2, "0");
        let ampm;

        if (hours >= 12) {
            ampm = "PM";
        } else {
            ampm = "AM";
        }
        hours = hours % 12;
        if (hours === 0) hours = 12;

        document.querySelector(".time").innerText = `Local Time: ${hours}:${minutes} ${ampm}`;

        // Fondo dinámico según ciudad + clima
        setBackground(name, description);

        document.querySelector(".weather").classList.remove("loading");
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

// Eventos
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") weather.search();
});

// Cargar clima inicial
weather.fetchWeather("Santo Domingo");

// --- Función para fondo dinámico ---
function setBackground(city, weatherDescription) {
    const query = `${city} ${weatherDescription}`;
    fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashClientId}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.urls && data.urls.full) {
                document.body.style.backgroundImage = `url('${data.urls.full}')`;
            } else {
                // Respaldo si no hay imagen
                document.body.style.backgroundImage = "url('https://picsum.photos/1600/900')";
            }
        })
        .catch(err => {
            console.error("Error cargando fondo:", err);
            document.body.style.backgroundImage = "url('https://picsum.photos/1600/900')";
        });
}
