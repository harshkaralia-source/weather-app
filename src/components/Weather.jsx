'use client'

import { useState } from "react"

const Weather = () => {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState('')

    const API_KEY = import.meta.env.VITE_WEATHER_API
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${API_URL}&q${city}`)
            if (!response.ok) {
                throw new Error('City not found')
            }
            const data = await response.json()
            setWeatherData(data)
            setError('')
            console.log(data)
        } catch (error) {
            setError(error.message)
            setWeatherData(null)
        }
    }

    return (
        <div className='min-h-screen bg-blue-100 flex flex-col items-center pt-10 p-4'>
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4">Weather App</h1>
                <input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Enter city name"
                    type="text"
                    className='w-full p-2 border border-gray-300 outline-none rounded mb-4'
                />
                <button
                    onClick={fetchWeather}
                    className="w-full bg-emerald-500 text-white p-2 rounded cursor-pointer">
                    Get Weather
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {weatherData && (
                <div className="mt-6 bg-white p-6 rounded-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
                    <div className="flex items-center">
                        <p className="text-gray-600">{weatherData.weather[0].description}</p>
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                        className="w-10 h-10" 
                        alt="" />
                    </div>

                    <div className="mt-4">
                        <p className="text-xl">Temperature: {weatherData.main.temp}°C</p>
                        <p className="text-xl">Humidity: {weatherData.main.humidity}%</p>
                        <p className="text-xl">Wind Speed: {weatherData.wind.speed} m/s</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather
