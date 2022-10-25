import { of } from "rxjs";

export class FakeValueService {

  private value = 'Valor falso';

  constructor() { }

  setValue(value: string) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getValueAsPromise() {
    return Promise.resolve(this.value);
  }

  getValueAsObservable() {
    return of(this.value);
  }
}
