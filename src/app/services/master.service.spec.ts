import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './fake.value.service';

fdescribe('MasterService', () => {
  let vs: ValueService;
  let ms: MasterService;

  beforeEach(() => {
    vs = new ValueService();
    ms = new MasterService(vs);
  });

  it('should be created', () => {
    expect(ms).toBeTruthy();
  });

  it('Should return the value from Promise', () => {
    expect(ms.getValue()).toBe('Valor');
  });

  it('Should return a value from a fake service', () => {
    const fvs = new FakeValueService();
    const ms = new MasterService(fvs as unknown as ValueService);
    expect(ms.getValue()).toBe('Valor falso');
  });

  it('Should return a value from a fake object', () => {
    const fake = { getValue: () => 'Valor falso obj' };
    const ms = new MasterService(fake as ValueService);
    expect(ms.getValue()).toBe('Valor falso obj');
  });
});
