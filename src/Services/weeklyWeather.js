export async function getWeeklyWeather(city) {    
    const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    if (!locationResponse.ok) {
        throw new Error("Unable to find location");
    }
    const locationData = await locationResponse.json();
    if (!locationData.results || locationData.results.length === 0) {
        throw new Error("City not found");
    }
    const { latitude, longitude } = locationData.results[0];    
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,weather_code&past_days=6&forecast_days=1&timezone=auto`
    );
    if (!weatherResponse.ok) {
        throw new Error("Unable to fetch weekly weather");
    }
    const data = await weatherResponse.json();    
    const dates = data.daily.time;
    const today = new Date(dates[dates.length - 1] + "T12:00:00");
    const daysToShow = today.getDay() + 1;    
    const startIndex = dates.length - daysToShow;

    const weeklyData = dates.slice(startIndex).map((date, index) => {
        const actualIndex = startIndex + index;
        return {
            date: date,
            maxTemp: data.daily.temperature_2m_max[actualIndex],
            minTemp: data.daily.temperature_2m_min[actualIndex],
            humidity: data.daily.relative_humidity_2m_mean[actualIndex],
            conditionCode: data.daily.weather_code[actualIndex]
        };
    });
    return weeklyData;
}
