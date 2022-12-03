import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Main from "./components/Main";
import Panel from "./components/Panel";
import { useEffect, useState } from "react";
import { WeatherConditions, WeatherType, ConditionStatusType } from "./data/weatherConditions"
import { toast, ToastContainer } from 'react-toastify';

export type ApiType = {
  degree: string,
  locationName: string,
  localTime: string,
  isDay: boolean,
  conditinon: WeatherType,
  status: ConditionStatusType[]
}
function App() {
  const [weather, setWeather] = useState<ApiType>({} as ApiType);
  const [country, setCountry] = useState<string>("vietnam");

  const key = "c8cca880722f47f2a1b64305220112";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${country}`;

  useEffect(() => {
    fetchData();
  }, [country]);

  const fetchData = () => {
    fetch(apiUrl)
      .then(result => result.json())
      .then(data => {
        if (data.error) {
          toast(data.error.message, { theme: 'dark', type: "warning", position: 'top-left', })
          return;
        }
        const newWeather: ApiType = {
          degree: data.current.temp_c,
          locationName: (data.location.name as string).replace("City", ""),
          localTime: data.location.localtime,
          isDay: data.current.is_day === "1",
          conditinon: WeatherConditions.find(s => s.code === Number(data.current.condition.code)) ?? {} as WeatherType,
          status: [
            { name: "Cloudy", percent: data.current.cloud + "%" },
            { name: "Humidity", percent: data.current.humidity + "%" },
            { name: "Wind", percent: data.current.wind_kph + "km/h" }
          ]
        }
        setWeather(prev => prev = newWeather);
      })
      .catch(error => toast(error, { theme: 'dark', type: "warning", position: 'top-left', }))
  }

  if (!weather.status) {
    return (
      <h1>Loading...</h1>
    )
  }

  const background = `url(${require(`./assets/img/${weather.isDay ? "day" : "night"}/${weather.conditinon.background}.jpg`)})`
  return (
    <div className="text-text-main
                    w-screen h-screen bg-center bg-no-repeat bg-cover
                    easing-300
                    before:content-[''] before:w-screen before:h-screen before:bg-black before:absolute before:bg-300"
      style={{ backgroundImage: background }}
    >
      <div className="absolute w-screen h-screen flex flex-col justify-between items-start
                      lg:justify-start lg:items-center">
        <Header />
        {weather.conditinon && <Main weather={weather} />}
        {weather.status && <Panel weather={weather.status} setCountry={setCountry} />}
      </div>
      <ToastContainer />
    </div>
  )
}

export default App;
