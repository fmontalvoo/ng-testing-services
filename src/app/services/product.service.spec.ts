import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Product } from '../models/product.model';

import { ProductService } from './product.service';

import { environment } from 'src/environments/environment';
import { generateProducts } from '../data/product.mock';

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
      const mockData: Product[] = generateProducts();

      // Act
      ps.getAllSimple()
        .subscribe(data => {
          // Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
      http.verify(); // Verifica y agrega la data de mockData.
    });
  });

});
