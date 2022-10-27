import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  save(token: string) {
    localStorage.setItem('access_token', token);
  }

  get() {
    return localStorage.getItem('access_token');
  }

  remove() {
    localStorage.removeItem('access_token');
  }
}
