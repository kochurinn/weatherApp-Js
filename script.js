const temp = document.querySelector('.temp')
const apiKey = 'd5d6dd942f4191310434d453276c1fc6'
const search = document.querySelector('.weather__search-btn')
const inputCity = document.querySelector('.weather__search-inp')
const tempCity = document.querySelector('.weather__temp-celsius')
const nameCity = document.querySelector('.weather__temp-city')
const imgWeather = document.querySelector('.weather__temp-img')
const humidity = document.querySelector('.weather__optional-humidity') 
const wind = document.querySelector('.weather__optional-wind') 

checkWeather('Moscow')

search.addEventListener('click', () => {
    checkWeather(inputCity.value)
})

inputCity.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        checkWeather(inputCity.value)
    }
})

async function checkWeather(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${apiKey}`
        const response = await fetch(apiUrl)
        if (!response.ok) {
            inputCity.style.border = '2px solid red'
            throw new Error(response.status)
        }
        const data = await response.json()
        inputCity.style.border = '2px solid transparent'
        nameCity.textContent = inputCity.value.charAt(0).toUpperCase() + inputCity.value.slice(1)
        tempCity.textContent = `${Math.floor(data.main.temp - 273.15)}°C`
        humidity.textContent = `${data.main.humidity}%`
        wind.textContent = `${data.wind.speed} km/h`
        imgWeather.src = `img/${data.weather[0].icon}.svg`
    }
    catch (e) {
        console.log(e)
    }
    
}
