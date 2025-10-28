import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { WeatherData } from '../models/models-module';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private apiKey = 'c531c37025a8e39d81151d093093f817';
  private apiURL = 'http://api.weatherstack.com/current';

  private weatherList: WeatherData[] = [];
  private weatherListSubject = new BehaviorSubject<WeatherData[]>([]);
  weatherList$ = this.weatherListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadWeatherList();
  }

  getWeather(city: string): Observable<any> {
    const url = `${this.apiURL}?access_key=${this.apiKey}&query=${city}`;
    return this.http.get(url);
  }

  saveWeather(data: any) {
    if (data && data.location) {
      const newEntry: WeatherData = {
        id: Date.now(),
        name: data.location.name,
        country: data.location.country,
        temperature: data.current.temperature,
        condition: data.current.weather_descriptions[0],
        icon: data.current.weather_icons[0],
        searchedAt: new Date()
      };
      this.weatherList.push(newEntry);
      this.saveWeatherList();
    }
  }

  private saveWeatherList() {
    localStorage.setItem('weatherList', JSON.stringify(this.weatherList));
    this.weatherListSubject.next(this.weatherList);
  }

  private loadWeatherList() {
    const raw = localStorage.getItem('weatherList');
    if (raw) {
      this.weatherList = JSON.parse(raw);
      this.weatherListSubject.next(this.weatherList);
    }
  }

  deleteWeather(id: number) {
    this.weatherList = this.weatherList.filter(w => w.id !== id);
    this.saveWeatherList();
  }

  clearAll() {
    this.weatherList = [];
    this.saveWeatherList();
  }
}
