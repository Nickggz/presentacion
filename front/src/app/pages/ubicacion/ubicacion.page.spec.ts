import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UbicacionPage } from './ubicacion.page';

describe('UbicacionPage', () => {
  let component: UbicacionPage;
  let fixture: ComponentFixture<UbicacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbicacionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UbicacionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
