import React, { useContext } from "react";
import { WeatherContext } from "../Context/WeatherContext";

function WeeklyReport() {
    const {
        weeklyWeather,
        weeklyLoading,
        weeklyError
    } = useContext(WeatherContext);
    const getDay = (date) => {
        return new Date(date + "T12:00:00").toLocaleDateString(
            "en-IN",
            { weekday: "long" }
        );
    };
    const getCondition = (code) => {
        if (code === 0) return "Clear Sky";
        if ([1, 2, 3].includes(code)) return "Cloudy";
        if ([45, 48].includes(code)) return "Fog";
        if ([51, 53, 55, 61, 63, 65].includes(code)) return "Rain";
        if ([71, 73, 75, 77].includes(code)) return "Snow";
        if ([80, 81, 82].includes(code)) return "Rain Showers";
        if ([95, 96, 99].includes(code)) return "Thunderstorm";
        return "Unknown";
    };
    return (
        <div className="weekly-report">
            <h2>Weekly Weather Report</h2>
            {weeklyLoading && <p>Loading weekly report...</p>}
            {weeklyError && <p>{weeklyError}</p>}
            {!weeklyLoading && weeklyWeather.length > 0 && (
                <div className="weekly-container">
                    {weeklyWeather.map((day) => (
                        <div className="weekly-card" key={day.date}>
                            <h3>{getDay(day.date)}</h3>
                            <p>{day.date}</p>
                            <h2> {day.maxTemp}°C </h2>
                            <p> Min: {day.minTemp}°C </p>
                            <p> {getCondition(day.conditionCode)} </p>
                            <p> Humidity: {day.humidity}% </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default WeeklyReport;
