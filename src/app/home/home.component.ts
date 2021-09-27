import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  locations = [
    {
      name: 'london',
      temprature: '',
      sunrisetime: '',
      sunsettime: ''
    },
    {
      name: 'warsaw',
      temprature: '',
      sunrisetime: '',
      sunsettime: ''
    },
    {
      name: 'paris',
      temprature: '',
      sunrisetime: '',
      sunsettime: ''
    },
    {
      name: 'berlin',
      temprature: '',
      sunrisetime: '',
      sunsettime: ''
    },
    {
      name: 'rome',
      temprature: '',
      sunrisetime: '',
      sunsettime: ''
    },
  ]

  async ngOnInit() {
    this.fillData();
  }

  fillData() {
    this.locations.map(async (x) => {
      await this.callApi(x.name).then((y: any) => {
        console.log(y);
        x.temprature = y['main']['temp'];
        x.sunrisetime = y['sys']['sunrise'];
        x.sunsettime = y['sys']['sunset'];
      }
      );
    })
  }

  async callApi(cityName:string) {
    console.log(cityName);
    return await this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3d8b309701a13f65b660fa2c64cdc517`).toPromise();
  }

}
