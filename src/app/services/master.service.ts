import { Injectable } from '@angular/core';

import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private vs: ValueService,
  ) { }

  getValue() {
    return this.vs.getValue();
  }

}
