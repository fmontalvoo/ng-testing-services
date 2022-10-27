import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CreateProductDTO, Product } from '../models/product.model';

import { ProductService } from './product.service';

import { environment } from 'src/environments/environment';
import { generateProduct, generateProducts } from '../data/product.mock';

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

  afterEach(() => {
    http.verify(); // Verifica y agrega la data de mockData.
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
      // http.verify(); // Verifica y agrega la data de mockData.
    });
  });

  describe('Test for getAll', () => {
    it('Should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateProducts();

      // Act
      ps.getAll()
        .subscribe(data => {
          // Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
      // http.verify(); // Verifica y agrega la data de mockData.
    });


    it('Should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        ...generateProducts(2)
          .map((prod, i) => ({
            ...prod,
            price: ((i + 1) * 100),
          })),
        {
          ...generateProduct(),
          price: 0
        },
        {
          ...generateProduct(),
          price: -100
        }
      ];

      ps.getAll()
        .subscribe(data => {
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(12);
          expect(data[1].taxes).toEqual(24);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
      // http.verify(); // Verifica y agrega la data de mockData.
    });

    it('Should send query params with a limit in 10 and an offset in 3', (doneFn) => {
      const mockData: Product[] = generateProducts();
      const limit = 10;
      const offset = 5;

      ps.getAll(limit, offset)
        .subscribe(data => {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      const req = http.expectOne(`${environment.api_url}/products?limit=${limit}&offset=${offset}`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.

      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());

      // http.verify(); // Verifica y agrega la data de mockData.
    });

  });

  describe('Tests for create products', () => {
    it('Should return a new product', (doneFn) => {
      const mockData = generateProduct();
      const createProduct: CreateProductDTO = {
        price: 21,
        title: 'Product#1',
        images: mockData.images,
        categoryId: 1,
        description: 'Product description',
      };

      ps.create({ ...createProduct })
        .subscribe(prod => {
          expect(prod).toEqual(mockData);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.

      expect(req.request.method).toEqual('POST'); // Verifica el metodo utilizado en la llamada al servicio.
      expect(req.request.body).toEqual(createProduct); // Verifica la data enviada al servicio.

      // http.verify(); // Verifica y agrega la data de mockData.

    });
  });

});
