function WeatherCard({ weather }) {
    return (
        <div className="weather-card">
            <h2>{weather.city}</h2>
            <h1>{weather.temperature}°C</h1>
            <h3>{weather.condition}</h3>
            <div className="weather-details">
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind Speed: {weather.windSpeed} m/s</p>
            </div>
        </div>
    );
}
export default WeatherCard;
