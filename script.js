let weather = {
    apiKey: "e12e137d0e710f68d91744a683d4c85f",
    fetchWeather: function (city) {
    
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey

        )
        
        .then((response)=> response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name} = data;
        const {icon, description} = data.weather;
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
    }
};