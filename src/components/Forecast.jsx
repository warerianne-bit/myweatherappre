
import ForecastDay from "./ForecastDay";

function Forecast({ forecast }) {
  return (
    <section className="forecast">
      {forecast.map((day) => (
        <ForecastDay key={day.date} day={day} />
      ))}
    </section>
  );
}

export default Forecast;
