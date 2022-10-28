export interface IWebSiteData {
    name: string
    temp: number
    tempMax: number
    tempMin: number
    humidity: number
    wind: number
	id?: number
}

export interface IWeatherData {
    coord: ICoord,
    weather: IWeather[],
    main: IMain,
    visibility: number,
    wind: IWind,
    cloud: IClouds,
    dt: number,
    sys: ISys,
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface ICoord {
	lon: number,
	lat: number
}

export interface IWeather {
    id: number,
    main: string,
    description: string,
    icon: string
}

export interface IMain {
    temp: number,
    feelslike: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

export interface IWind {
    speed: number,
    deg: number
}

export interface IClouds {
    all: number
}

export interface ISys {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}
