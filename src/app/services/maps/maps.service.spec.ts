import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let ms: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });
    ms = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(ms).toBeTruthy();
  });

  describe('Test for getCurrentPosition', () => {
    it('Should set current position into point', () => {
      spyOn(navigator.geolocation, 'getCurrentPosition')
        .and.callFake(successFn => {
          const mockGeolocation = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 2.78,
              longitude: 0.93,
              speed: 0
            },
            timestamp: 0,
          };

          successFn(mockGeolocation);
        });

      ms.getCurrentPosition();

      expect(ms.point.lat).toEqual(2.78);
      expect(ms.point.lng).toEqual(0.93);
    });
  });

});
