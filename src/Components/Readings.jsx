import React from 'react';
import { useState, useEffect } from 'react';


const Readings = () => {
    const [city,setCity] = useState('');
    const [weatherdata,setWeatherData] = useState([]);
    const [loading , isLoading] = useState(false);
    const [click, setClick] = useState(false)
    const currentDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked');
        setClick(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a287543dbf42aa24b1b5d0c1b3c2ba2`)
        .then(res => res.json())
        .then(data => setWeatherData(data)).then(() => console.log(weatherdata))
    }
   

  return (
    
    <div className=' pt-28 space-y-16 bg-[#8e2de2] h-screen'>
        {/*Search bar */}
        <div>
            <div class='max-w-md mx-auto'>
                <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div class="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search for city..." value={city} onChange={e => setCity(e.target.value)}
                        /> 
                    </form>
                </div>
            </div>
        </div>

        {/*Weather card*/}

        <div>
            { !weatherdata.weather ? '' :
                <div class="flex items-center justify-center" key={weatherdata.id}>
                <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
					<div class="font-bold text-xl">{weatherdata.name}</div>
					<div class="text-sm text-gray-500">{days[currentDate.getDay()]} {currentDate.getDate()} {month[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
					<div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                        <img src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`}></img>
					</div>
					<div class="flex flex-row items-center justify-center mt-6">
						<div class="font-medium text-6xl">{Math.round(weatherdata.main.feels_like) - 273}°C</div>
						<div class="flex flex-col items-center ml-6">
						    <div>{weatherdata.weather[0].description}</div>
							<div class="mt-1">
								<span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
								<span class="text-sm font-light text-gray-500">{Math.round(weatherdata.main.temp_max) - 273}°C</span>
							</div>
							<div>
								<span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
								<span class="text-sm font-light text-gray-500">{Math.round(weatherdata.main.temp_min) - 273}°C</span>
							</div>
						</div>
					</div>
					<div class="flex flex-row justify-between mt-6">
						<div class="flex flex-col items-center">
							<div class="font-medium text-sm">Wind</div>
							<div class="text-sm text-gray-500">{weatherdata.wind.speed}k/h</div>
						</div>
						<div class="flex flex-col items-center">
							<div class="font-medium text-sm">Humidity</div>
							<div class="text-sm text-gray-500">{weatherdata.main.humidity}%</div>
						</div>
						<div class="flex flex-col items-center">
							<div class="font-medium text-sm">Visibility</div>
							<div class="text-sm text-gray-500">{(weatherdata.visibility / 1000)}km</div>
						</div>
					</div>
				</div>
                </div>
            }
        </div>
    </div>
    
  )
}

export default Readings