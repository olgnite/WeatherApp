import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {IWeatherData, IWebSiteData} from '../interfaces/weather.interface';
import {environment} from "../../environments/environment";
import {DEFAULT_TEMP} from "../tokens/temp.token";

@Injectable()
export class RequestService {
	public url: string;

	constructor(
		private http: HttpClient,
		@Inject(DEFAULT_TEMP) protected readonly defaultTempValue: number
	) {
	}

	public getWeatherData(cityName: string = null, lat: number = null, lon: number = null): Observable<IWebSiteData> {
		this.url = cityName !== null
			? `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${environment.apiKey}`
			: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`
		return this.http.get<IWeatherData>(this.url)
			.pipe(
				map((response: IWeatherData) => {
					return {
						name: response.name,
						temp: Math.round(response.main.temp - this.defaultTempValue),
						tempMax: Math.round(response.main.temp_max - this.defaultTempValue),
						tempMin: Math.round(response.main.temp_min - this.defaultTempValue),
						humidity: response.main.humidity,
						wind: Math.round(response.wind.speed / 3.6)
					}
				})
			);
	}
}
