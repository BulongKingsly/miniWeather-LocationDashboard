import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Weather } from '../services/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  city: string = '';
  weatherData: any = null;
  errorMessage: string = '';
  isSaved: boolean = false;

  constructor(private weatherService: Weather) {}

  getWeather() {
    this.weatherData = null;
    this.errorMessage = '';
    this.isSaved = false;

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        if (data && data.location) {
          this.weatherData = data;
        } else {
          this.errorMessage = 'City not found or invalid API response.';
        }
      },
      error: () => {
        this.errorMessage = 'API Error — please try again later.';
      }
    });
  }

  saveWeather() {
    if (this.weatherData) {
      this.weatherService.saveWeather(this.weatherData);
      this.isSaved = true;
    }
  }
}
