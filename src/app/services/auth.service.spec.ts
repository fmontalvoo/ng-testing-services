import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { TokenInterceptor } from "../interceptors/token.interceptor";

import { Auth } from "../models/auth.model";

import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";

import { environment } from "src/environments/environment";

describe('AuthService', () => {
  let ts: TokenService;
  let as: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ],
    });
    ts = TestBed.inject(TokenService);
    as = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify(); // Verifica y agrega la data de mockData.
  });

  it('should be created', () => {
    expect(as).toBeTruthy();
  });

  describe('Tests for login', () => {
    it('It should return a token', (doneFn) => {
      const mockData: Auth = {
        access_token: 'Token.123'
      };

      const email = 'test@mail.com';
      const pass = 'Abc.123';

      as.login(email, pass)
        .subscribe(data => {
          expect(data).toEqual(mockData);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/auth/login`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
    });

    it('It should save the token', (doneFn) => {
      const mockData: Auth = {
        access_token: 'Token.123'
      };

      const email = 'test@mail.com';
      const pass = 'Abc.123';

      spyOn(ts, 'save').and.callThrough(); // Espia el metodo save pero no lo ejecuta.

      as.login(email, pass)
        .subscribe(data => {
          expect(data).toEqual(mockData);
          expect(ts.save).toHaveBeenCalledTimes(1);
          expect(ts.save).toHaveBeenCalledOnceWith('Token.123');
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/auth/login`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
    });


  });

});
