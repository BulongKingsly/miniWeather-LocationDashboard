import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Weather } from '../services/weather';
import { WeatherData } from '../models/models-module';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-list.html',
  styleUrls: ['./weather-list.css']
})
export class WeatherListComponent {
  weatherList: WeatherData[] = [];

  constructor(private weatherService: Weather, private router: Router) {
    this.weatherService.weatherList$.subscribe(list => {
      this.weatherList = list;
    });
  }

  deleteItem(id: number): void {
    this.weatherService.deleteWeather(id);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  get totalEntries(): number {
    return this.weatherList.length;
  }
}
