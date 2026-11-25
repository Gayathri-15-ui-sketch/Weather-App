import React, { useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { getWeather } from "../Services/weather";
import { getWeeklyWeather } from "../Services/weeklyWeather";

function WeatherProvider({ children }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [weeklyWeather, setWeeklyWeather] = useState([]);
    const [weeklyLoading, setWeeklyLoading] = useState(false);
    const [weeklyError, setWeeklyError] = useState("");

    const fetchWeather = async (city) => {
        
        setLoading(true);
        setError("");

        try {
            const data = await getWeather(city);
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }     
        setWeeklyLoading(true);
        setWeeklyError("");

        try {
            const weeklyData = await getWeeklyWeather(city);
            setWeeklyWeather(weeklyData);
        } catch (err) {
            setWeeklyError(err.message);
            setWeeklyWeather([]);
        } finally {
            setWeeklyLoading(false);
        }
    };
    return (
        <WeatherContext.Provider
            value={{
                weather,
                loading,
                error,
                fetchWeather,
                weeklyWeather,
                weeklyLoading,
                weeklyError
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}
export default WeatherProvider;
