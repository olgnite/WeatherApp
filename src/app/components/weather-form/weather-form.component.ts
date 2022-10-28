import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {ICoordinates} from "../../interfaces/coordinates.interface";
import {IWebSiteData} from "../../interfaces/weather.interface";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-weather-form',
	templateUrl: './weather-form.component.html',
	styleUrls: ['./weather-form.component.scss']
})
export class WeatherFormComponent implements OnInit, OnDestroy {
	public form: FormGroup;
	public coordinates: ICoordinates; // Ekb
	public weather: IWebSiteData;
	public weatherWidgets: IWebSiteData[] = [];
	public uSub: Subscription;

	constructor(private requestService: RequestService) {
	}

	public ngOnInit(): void {
		this.form = new FormGroup({
			latitude: new FormControl(56.85, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)),
			longitude: new FormControl(60.61, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/))
		})
	}

	public ngOnDestroy(): void {
		if (this.uSub) {
			this.uSub.unsubscribe();
		}
	}

	public submit(): void {
		if (this.form.invalid) {
			return
		}
		this.coordinates = {
			latitude: this.form.controls['latitude'].value,
			longitude: this.form.controls['longitude'].value
		}
		this.uSub = this.requestService.getWeatherData(null, this.coordinates.latitude, this.coordinates.longitude)
			.subscribe((value: IWebSiteData) => {
				this.weather = value;
				this.weatherWidgets.push(value);
			})
	}

	public removeWidget(element?: IWebSiteData): void {
		this.weatherWidgets = this.weatherWidgets.filter((v: IWebSiteData) => v !== element);
	}
}
