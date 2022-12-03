import { useRef } from 'react';
import { GoSearch } from 'react-icons/go'
import { ConditionStatusType } from "../data/weatherConditions"

function Panel({ setCountry, weather }: { setCountry: any, weather: ConditionStatusType[] }) {
  const countries = ["New York", "California", "Paris", "Tokyo"];
  const country = useRef("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setCountry(country.current);
  }
  return (
    <div className='form absolute right-0 top-0 w-[500px] h-screen p-8 no-scrollbar easing-300
                    lg:relative lg:w-full scroll-smooth'>
      <form onSubmit={onSubmit}
        className="w-full flex justify-between items-center gap-x-5">
        <input
          spellCheck={false}
          onChange={(e) => country.current = e.target.value}
          type="text" required
          className='pb-2 flex-1 cursor-text text-xl bg-transparent
                    outline-none  border-solid border-2 border-transparent border-b-text-main'
          placeholder="Search Location..."
        />
        <button type="submit" className='hover:opacity-[.8] bg-orange-500 p-4 rounded-lg'>
          <GoSearch size={25} />
        </button>
      </form>

      <ul className='pb-5 mb-10 cursor-pointer border-solid border-2 border-transparent border-b-text-main'>
        {countries.map(item => (
          <li
            onClick={() => setCountry(item)}
            key={item}
            className="hover:opacity-100 opacity-80 py-5 text-xl"
          >{item}
          </li>)
        )}
      </ul>
      <div>
        <h3 className='text-xl font-medium mb-5'>Weather Details</h3>
        <ul>
          {weather.map(item => (
            <li
              key={item.name}
              className="opacity-80 py-5 text-xl
                        flex justify-between items-center"
            >
              <span>{item.name}</span>
              <span>{item.percent}</span>
            </li>)
          )}
        </ul>
      </div>
    </div>
  )
}

export default Panel