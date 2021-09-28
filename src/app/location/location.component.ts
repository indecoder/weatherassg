import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  loc:any;
  locsubs: any;

  data:any = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

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
      await this.dataService.callApiloc(this.loc, Date.parse(dt)/1000+'').then(async (x:any) => {
        await this.data.push({'date': dt, 'temp':x['main']['temp'], 'sealevel': x['main']['sea_level'] ? x['main']['sea_level'] : x['main']['pressure']});
      })
    }
    console.log(this.data);
  }

  ngOnDestroy(): void {
    this.locsubs.unsubscribe();
  }

}
