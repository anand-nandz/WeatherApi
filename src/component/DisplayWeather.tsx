import { useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";
import { BiWind } from "react-icons/bi";
import { TbLoader3 } from "react-icons/tb";
import { PiCityFill } from "react-icons/pi";
import { MdBlockFlipped } from "react-icons/md";
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { ForecastData, ForecastItem, WeatherDataProps } from '../interface/interface';
import WeatherIcon from './WeatherIcon';


const DisplayWeather = () => {

    const api_key = import.meta.env.VITE_API_KEY || '';
    const api_Endpoint = import.meta.env.VITE_API_END_POINT || ''

    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)
    const [forecastData, setForecastData] = useState<ForecastItem[]>([])
    const [isLoading, setLoading] = useState(false);

    const [searchCity, setSearchCity] = useState("")

    const fetchCurrentWeather = async (lat: number, lon: number) => {
        const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
        const response = await axios.get(url)
        return response.data
    }

    const fetchFiveDayForecast = async (city: string) => {
        const url = `${api_Endpoint}forecast?q=${city}&appid=${api_key}&units=metric`;
        const response = await axios.get<ForecastData>(url);
        return response.data.list.filter((_, index) => index % 8 === 0);
    }


    const fetchWeatherData = async (city: string) => {
        try {
            const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`
            const searchResponse = await axios.get(url)
            const currentWeatherData: WeatherDataProps = searchResponse.data
            const forecastData = await fetchFiveDayForecast(city);


            return { currentWeatherData, forecastData }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const handleSearch = async () => {
        if (searchCity.trim() === '') return
        try {
            const { currentWeatherData, forecastData } = await fetchWeatherData(searchCity.trim())
            setWeatherData(currentWeatherData)
            setForecastData(forecastData)
            setLoading(true)
            setSearchCity('')
        } catch (error) {
            console.error(error);
            setWeatherData(null)
            setForecastData([])
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                toast.error('City not found')
            }, 3000)

        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            Promise.all([fetchCurrentWeather(latitude, longitude)])
                .then(
                    ([currentWeather]) => {
                        console.log(currentWeather);
                        setWeatherData(currentWeather);
                        fetchFiveDayForecast(currentWeather.name)
                            .then(forecast => setForecastData(forecast));
                        setLoading(true)

                    }
                )
        })
    }, [])

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }



    return (
        <>


            <div className='h-screen bg-gradient-to-r from-[#c7c7eb] to-[#ccf2dd]' >
                <div className='bg-white/60 rounded-lg p-4 absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 shadow-lg text-black/80 flex flex-col justify-between items-center'>

                    <div className='container'>
                        <div className="mt-5 flex  justify-evenly items-center w-full">
                            <input
                                type="text"
                                placeholder='Enter a city'
                                className='outline-none border border-gray-400 px-2 py-1 rounded-full text-center w-4/5 bg-transparent'
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <div className="border border-gray-400 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer">
                                <AiOutlineSearch className='text-xl text-gray-500' onClick={handleSearch} />
                            </div>
                        </div>

                        {weatherData && isLoading ? (


                            <>

                                <div className="flex flex-col items-center my-7">
                                    <h1 className='text-3xl font-bebas'>{weatherData?.name}</h1>
                                    <span className='mb-2.5 '>{weatherData?.sys.country}</span>
                                    <div className="text-[9rem]">
                                        <WeatherIcon weather={weatherData.weather[0].main} size='12rem' />
                                    </div>
                                    <h1 className='text-3xl font-bebas'>{weatherData?.main.temp.toFixed(0)}</h1>
                                    <h2 className='text-2xl font-inter font-normal'>{weatherData.weather[0].main}</h2>
                                </div>

                                <div className="flex items-center justify-around font-josefin m-2.5 bg-gradient-to-r from-[#f3fffd] to-[#fdffe8] rounded-lg p-2.5 ">
                                    <div className="flex items-center mx-5">
                                        <WiHumidity className='text-5xl' />
                                        <div className="humidityInfo">
                                            <h1 className='text-3xl font-bebas'>{weatherData.main.humidity}%</h1>
                                            <p className='text-[22px] mt-2.5 font-josefin'>Humidity</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center mx-5">
                                        <BiWind className='text-3xl mr-2.5' />
                                        <div className="humidityInfo">
                                            <h1 className='text-3xl font-bebas'>{weatherData.wind.speed}km/h</h1>
                                            <p className='text-[22px] mt-2.5 font-josefin'>Wind Speed</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center mx-5">
                                        <div className="flex items-center">
                                            <WiSunrise className="text-3xl mr-2.5" />
                                            <p className="text-sm font-medium">
                                                Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <WiSunset className="text-3xl mr-2.5" />
                                            <p className="text-sm font-medium">
                                                Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>


                                </div>
                              

                                <h2 className="text-xl font-bold mt-6">5-DayWeather Forecast</h2>


                                <div className="mt-6 overflow-x-auto">
                                    <div className="flex space-x-4 min-w-max p-2">
                                        {forecastData.map((forecast, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center bg-white/50 rounded-lg p-3 w-32"
                                            >
                                                <p className="text-sm font-medium">
                                                    {formatDate(forecast.dt_txt)}
                                                </p>
                                                <div className="text-4xl my-2">
                                                    <WeatherIcon weather={forecast.weather[0].main} size='6rem' />
                                                </div>
                                                <p className="text-xl font-bold">{forecast.main.temp.toFixed(0)}°C</p>
                                                <p className="text-sm">{forecast.weather[0].main}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </>

                        ) : (
                            isLoading ? (
                                <div className="h-[400px] w-80 flex flex-col justify-center items-center z-500">
                                    <TbLoader3 className='text-3xl animate-spin-slow' />
                                    <p className='text-[22px] mt-2.5 font-josefin'>Loading</p>
                                </div>
                            ) : (
                                <div className="h-[400px] w-80 flex flex-col justify-center items-center z-500">
                                    <div className="relative">
                                        <MdBlockFlipped className='text-8xl text-red-700 z-10' />
                                        <div className="absolute inset-0 flex justify-center items-center">
                                            <PiCityFill className='text-5xl ' />
                                        </div>
                                    </div>

                                    <p className='text-[22px] mt-2.5 font-josefin'>City not found! Please try again.</p>
                                </div>
                            )
                        )

                        }

                    </div>


                </div>
            </div>
            <Toaster position='top-right' richColors />

        </>
    )
}

export default DisplayWeather