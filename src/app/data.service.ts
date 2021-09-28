import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //api caller using city name
  async callApi(cityName:string) {
    return await this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3d8b309701a13f65b660fa2c64cdc517`).toPromise();
  }

  //api calling function
  callApiloc(cityName:string, tms: string) {
    console.log(cityName);
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&dt=${tms}&appid=3d8b309701a13f65b660fa2c64cdc517`).toPromise();
  }
  
}
