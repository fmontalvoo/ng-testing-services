import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Product } from '../models/product.model';

import { ProductService } from './product.service';

import { environment } from 'src/environments/environment';

fdescribe('ProductService', () => {
  let ps: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService
      ],
    });
    ps = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(ps).toBeTruthy();
  });

  describe('Test for getAllSimple', () => {
    it('Should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          id: 1,
          title: "Rustic Frozen Gloves",
          price: 335,
          description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
          category: {
            id: 5,
            name: "Others",
          },
          images: [
            "https://api.lorem.space/image?w=640&h=480&r=1292",
            "https://api.lorem.space/image?w=640&h=480&r=702",
            "https://api.lorem.space/image?w=640&h=480&r=8367"
          ]
        },
        {
          id: 44,
          title: "Practical Cotton Chips",
          price: 636,
          description: "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
          category: {
            id: 4,
            name: "Shoes",
          },
          images: [
            "https://api.lorem.space/image/shoes?w=640&h=480&r=6890",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=9524",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=4003"
          ]
        }
      ];

      // Act
      ps.getAllSimple()
        .subscribe(data => {
          // Assert
          expect(data.length).toEqual(mockData.length);
          console.log(data);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
      http.verify(); // Verifica y agrega la data de mockData.
    });
  });

});
