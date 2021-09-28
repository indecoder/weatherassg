import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch data from Api for london location`, async() => {

    service.callApi('london')
      .then((posts: any) => {
        expect(posts.length).toBe(1);
      });

    const req = httpMock.expectOne('https://api.openweathermap.org/data/2.5/weather?q=london&appid=3d8b309701a13f65b660fa2c64cdc517');
    
    const postItem = [
      {"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":288.52,"feels_like":288.18,"temp_min":286.91,"temp_max":290.37,"pressure":1018,"humidity":79},"visibility":10000,"wind":{"speed":3.6,"deg":170},"clouds":{"all":75},"dt":1632823188,"sys":{"type":2,"id":2019646,"country":"GB","sunrise":1632808578,"sunset":1632851152},"timezone":3600,"id":2643743,"name":"London","cod":200}
    ];

    expect(req.request.method).toBe("GET");

    req.flush(postItem);
    httpMock.verify();

  });

  it(`should fetch data from Api for warsaw location and time 28 September 2021 9:00:00 AM`, async() => {

    service.callApiloc('warsaw','1632819600')
      .then((posts: any) => {
        expect(posts.length).toBe(1);
      });

    const req = httpMock.expectOne('https://api.openweathermap.org/data/2.5/weather?q=warsaw&dt=1632819600&appid=3d8b309701a13f65b660fa2c64cdc517');
    
    const postItem = [
      {"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":288.52,"feels_like":288.18,"temp_min":286.91,"temp_max":290.37,"pressure":1018,"humidity":79},"visibility":10000,"wind":{"speed":3.6,"deg":170},"clouds":{"all":75},"dt":1632823188,"sys":{"type":2,"id":2019646,"country":"GB","sunrise":1632808578,"sunset":1632851152},"timezone":3600,"id":2643743,"name":"London","cod":200}
    ];

    expect(req.request.method).toBe("GET");

    req.flush(postItem);
    httpMock.verify();

  });
});
