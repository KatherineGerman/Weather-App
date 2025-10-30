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
        const {icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        const timezoneOffset = data.timezone; //seconds
        

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed+" km/h";
        
        const  localTime = new Date(Date.now() +timezoneOffset * 1000);
        let hours = localTime.getUTCHours().toString().padStart(2,"0");
        let  minutes = localTime.getUTCMinutes().toString().padStart(2,"0");
       
       
        //time am-pm

        let ampm
        if(hours >= 12) {
        ampm = "PM"
        } else {ampm = "AM"}

        hours = hours %12;
        if(hours === 0) {
          hours = 12;
        }
        document.querySelector(".time").innerText = `Local Time: ${hours}:${minutes} ${ampm} `;

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
   search: function () {
      this.fetchWeather( document.querySelector(".search-bar").value);
   },
    
};


document.querySelector(".search button").addEventListener("click", function () {

weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if(event.key == "Enter") {
        weather.search();
    }

});


weather.fetchWeather("Santo Domingo");

