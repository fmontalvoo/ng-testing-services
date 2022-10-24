import { Component, OnInit } from '@angular/core';

import { Calculator } from './tests/calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit(): void {
    const calculator = new Calculator();
    const a1 = calculator.multiply(7, 7);
    console.assert(a1 === 48, 'a1 should be 49');
    const a2 = calculator.divide(7, 1);
    console.assert(a2 === Infinity, 'a2 should be Infinity');
  }
}
