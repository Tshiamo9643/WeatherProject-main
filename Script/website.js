function search() {
    const apiKey = "2f4f69b049bc5e4ff92b2e8eb38fb03b";
    const cityName = document.getElementById("city").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const icon = data.weather[0].icon;
            const average = data.main.feels_like;

            document.getElementById("icon").src = `https://openweathermap.org/img/w/${icon}.png`;
            document.getElementById("description").textContent = data.weather[0].description;

            document.getElementById("temp").textContent = `${temp.toFixed(0)}°C`;
            document.getElementById("average").textContent = `${average.toFixed(0)}°C`;

            document.getElementById("min").textContent = `${data.main.temp_min.toFixed(0)}°C`;
            document.getElementById("max").textContent = `${data.main.temp_max.toFixed(0)}°C`;

            document.getElementById("wind").textContent = `${data.wind.speed} Km/h`;
            document.getElementById("humid").textContent = `${data.main.humidity}%`;
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(weatherData => {
            const date = new Date(weatherData.list[0].dt_txt);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            document.getElementById("day").textContent = days[date.getDay()];
            document.getElementById("date").textContent = date.getDate();
            document.getElementById("months").textContent = months[date.getMonth()];

            const nextWeather = document.getElementById("nextWeather");
            nextWeather.innerHTML = ''; // Clear previous forecast

            for (let i = 1; i <= 3; i++) {
                const forecast = weatherData.list[i * 8]; // Approx. every 24 hours (3-hour intervals)
                const forecastDate = new Date(forecast.dt_txt);
                const dayName = days[forecastDate.getDay()].slice(0, 3);

                nextWeather.innerHTML += `
                    <div class="dayDiv">
                        <h4>${dayName}</h4>
                        <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon">
                        <h4>${forecast.main.temp.toFixed(0)}°C</h4>
                    </div>`;
            }
        });
}
