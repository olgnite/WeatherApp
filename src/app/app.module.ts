import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule,} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AngularYandexMapsModule, YaConfig} from "angular8-yandex-maps";
import {LayoutComponent} from './components/layout/layout.component';
import {WeatherFormComponent} from './components/weather-form/weather-form.component';
import {RequestService} from "./services/request.service";

const mapConfig: YaConfig = {
	apikey: "14bca0e1-19ea-4ebc-87ad-90752e5d8b4a",
	lang: "en_US",
}

@NgModule({
	declarations: [
		AppComponent,
		LayoutComponent,
		WeatherFormComponent,
	],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000'
		}),
		AngularYandexMapsModule.forRoot(mapConfig),
		ReactiveFormsModule
	],
	providers: [
		RequestService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
