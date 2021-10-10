let weather = {
    apiKey: "3a00e49ad7c5a2046d3c310b8c1d51c4",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => {
            if (response.ok){
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((responseJson) => {
            // console.log(responseJson)
            this.displayWeather(responseJson);
        })
        .catch((error) => {
            // console.log(error)
            this.errorSearch();
        });
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        // console.log(name,icon,description,temp,humidity,speed, country);
        document.querySelector(".city").innerText = "Weather in " + name +", " + country;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')";
        // == change background image div ==
        // console.log(description);
        switch (description){
            case 'clear sky':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/5xW5rM9/clear-sky.png')";  
                break; 
            case 'few clouds':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/2kgYfg5/few-clouds.png')";
                break;
            case 'scattered clouds':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/4SvBj9Y/scattered-clouds.png')";   
                break;   
            case 'overcast clouds':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/4SvBj9Y/scattered-clouds.png')";   
                break;   
            case 'broken clouds':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/PDNCFfg/broken-clouds.png')";
                break;
            case 'light rain':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/nwSM8Fn/rain.png')";   
                break;
            case 'shower rain':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/nwSM8Fn/rain.png')";   
                break;
            case 'thunderstorm':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/DGDp7CF/thunderstorm.png')";   
                break;    
            case 'snow':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/xSGR3hn/snow.png')";  
                break;    
            case 'mist':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/GWQ38Qm/mist.png')";  
                break;    
            case 'haze':
            document.querySelector(".card").style.backgroundImage = "url('https://i.ibb.co/GWQ38Qm/mist.png')";  
        }
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    errorSearch: function(){
        document.querySelector(".city").innerText = "";
        document.querySelector(".icon").innerText = "";
        document.querySelector(".description").innerText = "";
        document.querySelector(".temp").innerText = "";
        document.querySelector(".humidity").innerText = "";
        document.querySelector(".wind").innerText = "";
        document.querySelector(".icon").src = "";
        document.querySelector(".card").style.backgroundImage = "";
        document.body.style.background = "#222";
        Swal.fire({title: 'Error!', text: 'The name of the city is not valid, please enter another.', icon:'error', confirmButtonText: 'Understood'})
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Valparaiso");
