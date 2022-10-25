import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './fake.value.service';

describe('MasterService', () => {
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

  it('Should call to getValue from ValueService', () => {
    const vs: jasmine.SpyObj<ValueService> = jasmine.createSpyObj('ValueService', ['getValue']);
    vs.getValue.and.returnValue('Valor falso');
    const ms = new MasterService(vs);
    expect(ms.getValue()).toBe('Valor falso');
    expect(vs.getValue).toHaveBeenCalled();
    expect(vs.getValue).toHaveBeenCalledTimes(1);
  });

});
