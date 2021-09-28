import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should fetch data from Api`, waitForAsync(inject([HttpTestingController],
    (httpClient: HttpTestingController) => {

      const postItem = [
        {"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":288.52,"feels_like":288.18,"temp_min":286.91,"temp_max":290.37,"pressure":1018,"humidity":79},"visibility":10000,"wind":{"speed":3.6,"deg":170},"clouds":{"all":75},"dt":1632823188,"sys":{"type":2,"id":2019646,"country":"GB","sunrise":1632808578,"sunset":1632851152},"timezone":3600,"id":2643743,"name":"London","cod":200}
      ];


      component.callApi('london')
        .then((posts: any) => {
          expect(posts.length).toBe(1);
        });

      let req = httpMock.expectOne('https://api.openweathermap.org/data/2.5/weather?q=london&appid=3d8b309701a13f65b660fa2c64cdc517');
      expect(req.request.method).toBe("GET");

      req.flush(postItem);
      httpMock.verify();

    })));
});
