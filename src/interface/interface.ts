export interface WeatherDataProps {
    name: string;
    main: {
        temp: number,
        humidity: number
    };
    sys: {
        country: string,
        sunrise: number,
        sunset: number;

    };
    weather: {
        main: string
    }[];
    wind: {
        speed: number
    },

}

export interface WeatherIconProps {
    weather: string;
    size: string
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    dt_txt: string;
}

export interface ForecastData {
    list: ForecastItem[];
}