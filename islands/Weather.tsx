import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { fetchWeatherApi } from "npm:openmeteo";
import { useSignal } from "@preact/signals";

type Weather = {
  time: string;
  interval: number;
  temperature_2m: number;
  precipitation: number;
  cloud_cover: number;
  windspeed_10m: number;
}

const Weather:FunctionComponent = () => {
    const [city, setCity] = useState<string>("Madrid");
    const [dataciudad, setDataciudad] = useState<Weather>();
    const [tiempo, vieTiempo] = useState<boolean>(false);
    const [interval, vieInterval] = useState<boolean>(false);
    const [temp, vieTemp] = useState<boolean>(false);
    const [prec, viePrec] = useState<boolean>(false);
    const [cloud, vieCloud] = useState<boolean>(false);
    const [wind, vieWind] = useState<boolean>(false);

    useEffect(() => {
        const Funcion = async () => {
        const ciudad = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}`, {
          headers: {
            'X-Api-Key': 'zFVGQOpWcbW1Idwkx/FC0Q==YcpEaoNW4Gf9R83w'
          }
        });
        const datac = await ciudad.json();
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${datac[0].latitude}&longitude=${datac[0].longitude}&current=temperature_2m,precipitation,cloud_cover,wind_speed_10m`);
        const data = await response.json();
        const dataTiempo: Weather = {
          time: data.current.time,
          interval: data.current.interval,
          temperature_2m: data.current.temperature_2m,
          precipitation: data.current.precipitation,
          cloud_cover: data.current.cloud_cover,
          windspeed_10m: data.current.wind_speed_10m
        };
        setDataciudad(dataTiempo);
      };
    Funcion();  
  },[city]);
  return (
    <>
      <input 
      placeholder={"City Name"}
      type={"text"}
      onChange={(e) => setCity(e.currentTarget.value)}
      onEmptied={() => setCity("Madrid")}
      />
      <br/>
      <button onClick={() => vieTiempo(!tiempo)}>Time</button>
      <button onClick={() => vieInterval(!interval)}>Interval</button>
      <button onClick={() => vieTemp(!temp)}>Temperature</button>
      <button onClick={() => viePrec(!prec)}>Precipitation</button>
      <button onClick={() => vieCloud(!cloud)}>Cloud Cover</button>
      <button onClick={() => vieWind(!wind)}>Wind Speed</button>

      <div>
          {city &&<div>{city}</div>}
      </div>
      
      {tiempo && <div>{dataciudad?.time}</div>}
      {interval && <div>{dataciudad?.interval}</div>}
      {temp && <div>{dataciudad?.temperature_2m}</div>}
      {prec && <div>{dataciudad?.precipitation}</div>}
      {cloud && <div>{dataciudad?.cloud_cover}</div>}
      {wind && <div>{dataciudad?.windspeed_10m}</div>}
    </>
  );
}

export default Weather;

