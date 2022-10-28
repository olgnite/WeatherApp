import {Component, OnDestroy, OnInit} from '@angular/core';
import {IWebSiteData} from "../../interfaces/weather.interface";
import {RequestService} from "../../services/request.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
	public weather: IWebSiteData;
	public cityName: string = 'Екатеринбург';
	public uSub: Subscription;

	constructor(private requestService: RequestService) {
	}

	public ngOnInit(): void {
		this.onSubmit();
	}

	public ngOnDestroy(): void {
		if (this.uSub) {
			this.uSub.unsubscribe();
		}
	}

	private getWeatherDataByName(cityName: string): void {
		this.uSub = this.requestService.getWeatherData(cityName.trim())
			.subscribe((value: IWebSiteData) => {
				this.weather = value;
			})
	}

	public onSubmit(): void {
		this.getWeatherDataByName(this.cityName);
		this.cityName = '';
	}
}
