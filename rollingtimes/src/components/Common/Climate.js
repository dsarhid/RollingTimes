import React from "react";
import "weather-icons/css/weather-icons.css";

const Climate = (props) => {
  const ciudad = props.clima.name;
  const pais = props.clima.sys && props.clima.sys.country;
  const icono = props.clima.weather && props.clima.weather[0].icon;
  const temperatura = props.clima.main && props.clima.main.temp;

  let output = "";

  switch (icono) {
    case "01d":
      output += "wi-day-sunny";
      break;
    case "02d":
      output += "wi-day-cloudy";
      break;
    case "03d":
      output += "wi-cloud";
      break;
    case "04d":
      output += "wi-cloudy";
      break;
    case "09d":
      output += "wi-rain";
      break;
    case "10d":
      output += "wi-day-sleet";
      break;
    case "11d":
      output += "wi-day-snow-thunderstorm";
      break;
    case "13d":
      output += "wi-snow";
      break;
    case "50d":
      output += "wi-day-haze";
      break;
    default:
      output += "wi-day-cloudy";
  }
  return (
    <div className="bg5 p-0 d-flex align-items-center">
      {temperatura ? (
        <div className="cards pt-2 pl-4">
          <h3 className="text-center pt-2 px-0 m-0 color1">
            <i className={`wi ${output}`}></i> {temperatura}°C
          </h3>
          <p className="col-12 px-0 mb-0 color1">
            {ciudad}, {pais}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Climate;
