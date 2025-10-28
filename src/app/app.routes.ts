import { Routes } from '@angular/router';
import { Home } from './home/home';
import { WeatherListComponent } from './weather-list/weather-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'weather-list', component: WeatherListComponent }
];
