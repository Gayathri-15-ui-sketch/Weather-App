import React, { useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { getWeather } from "../Services/weather";

function WeatherProvider({ children }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async (city) => {
        try {
            setLoading(true);
            setError("");

            const data = await getWeather(city);
            setWeather(data);

        } catch (err) {
            setError(err.message);
            setWeather(null);

        } finally {
            setLoading(false);
        }
    };
    return (
        <WeatherContext.Provider
            value={{ weather, loading, error, fetchWeather }}
        >
            {children}
        </WeatherContext.Provider>
    );
}
export default WeatherProvider;
