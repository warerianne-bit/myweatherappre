
export function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

function ForecastDay({ day }) {
  const dayName = new Date(
    `${day.date}T12:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="forecast-day">
      <div className="forecast-name">{dayName}</div>

      <div className="forecast-icon">
        {getWeatherIcon(day.code)}
      </div>

      <div className="forecast-temperatures">
        <span className="forecast-max">{day.max}°</span>
        <span className="forecast-min">{day.min}°</span>
      </div>
    </div>
  );
}

export default ForecastDay;
