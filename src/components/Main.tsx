import day from "../assets/icon/day/113.png"
import { ApiType } from "../App"

function Main({ weather }: { weather: ApiType }) {
  return (
    <div className='pl-20 pb-20 easing-300
                    flex flex-wrap items-end justify-center gap-x-10
                    lg:pl-0'>
      <div>
        <h3 className='text-[7rem] leading-[6rem]'>{weather.degree}°</h3>
      </div>
      <div>
        <h1 className='text-[3.5rem]'>{weather.locationName}</h1>
        <span className="text-xl block text-center">{weather.localTime}</span>
      </div>
      <div className="flex flex-col justify-center">
        <img
          className="block m-auto"
          src={require(`../assets/icon/${weather.isDay ? "day" : "night"}/${weather.conditinon.icon}.png`)}
          width="80"
          height="80"
          alt="icon"
        />
        <span className="text-xl">{weather.isDay ? weather.conditinon.day : weather.conditinon.night}</span>
      </div>
    </div>
  )
}

export default Main
