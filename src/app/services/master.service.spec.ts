import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './fake.value.service';

describe('MasterService', () => {
  let ms: MasterService;
  let vss: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy: jasmine.SpyObj<ValueService> = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy } // Cuando trate de inyectar a ValueService utilizara el espia en su lugar.
      ]
    });
    ms = TestBed.inject(MasterService);
    vss = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('Should be created', () => {
    expect(ms).toBeTruthy();
  });

  xit('Should return the value from Promise', () => {
    expect(ms.getValue()).toBe('Valor');
  });

  xit('Should return a value from a fake service', () => {
    const fvs = new FakeValueService();
    const ms = new MasterService(fvs as unknown as ValueService);
    expect(ms.getValue()).toBe('Valor falso');
  });

  xit('Should return a value from a fake object', () => {
    const fake = { getValue: () => 'Valor falso obj' };
    const ms = new MasterService(fake as ValueService);
    expect(ms.getValue()).toBe('Valor falso obj');
  });

  it('Should call to getValue from ValueService', () => {
    // const vs: jasmine.SpyObj<ValueService> = jasmine.createSpyObj('ValueService', ['getValue']);
    vss.getValue.and.returnValue('Valor falso');
    // const ms = new MasterService(vs);
    expect(ms.getValue()).toBe('Valor falso');
    expect(vss.getValue).toHaveBeenCalled();
    expect(vss.getValue).toHaveBeenCalledTimes(1);
  });

});
