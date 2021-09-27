import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  loc:any;
  locsubs: any;

  data:any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  async ngOnInit() {
    //getting parameter from route
    this.locsubs = this.route.params.subscribe(x => this.loc = x['id']);
    await this.fillDate();
  }

  //data filling function
  async fillDate() {
    for(let i = 1; i < 6; i++) {
      let date = new Date();
      let day = new Date(date.setDate(date.getDate() + i));
      let dt = ((day.getMonth() > 8) ? (day.getMonth() + 1) : ('0' + (day.getMonth() + 1))) + '/' + ((day.getDate() > 9) ? day.getDate() : ('0' + day.getDate())) + '/' + day.getFullYear();
      dt = dt + ' 09:00:00';
      await this.callApi(this.loc, Date.parse(dt)/1000+'').then(async (x:any) => {
        await this.data.push({'date': dt, 'temp':x['main']['temp'], 'sealevel': x['main']['sea_level'] ? x['main']['sea_level'] : x['main']['pressure']});
      })
    }
    console.log(this.data);
  }

  ngOnDestroy(): void {
    this.locsubs.unsubscribe();
  }

  //api calling function
  callApi(cityName:string, tms: string) {
    console.log(cityName);
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&dt=${tms}&appid=3d8b309701a13f65b660fa2c64cdc517`).toPromise();
  }

}
