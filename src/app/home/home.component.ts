import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }
  
  //random city names
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

  //filling locations data using api
  fillData() {
    this.locations.map(async (x) => {
      await this.dataService.callApi(x.name).then((y: any) => {
        x.temprature = y['main']['temp'];
        x.sunrisetime = y['sys']['sunrise'];
        x.sunsettime = y['sys']['sunset'];
      }
      );
    })
  }

}
