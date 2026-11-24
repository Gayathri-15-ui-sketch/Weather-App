import React, { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../Context/WeatherContext";
import WeatherCard from "./WeatherCard";
function Weather() {
    const { weather, loading, error, fetchWeather } = useContext(WeatherContext);
    const [city, setCity] = useState("");
    useEffect(() => { fetchWeather("Chennai"); }, []);

    const handleSearch = () => { if (city.trim() !== "") {
            fetchWeather(city);
        }
    };
    return (
        <div className="weather-container">
            <h1>Weather Forecast</h1>
            <p>Enter your city to check the weather</p>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading && <p>Loading weather...</p>}
            {error && <p>{error}</p>}
            {weather && <WeatherCard weather={weather} />}
        </div>
    );
}
export default Weather;
