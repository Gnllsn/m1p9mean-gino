import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyHomeComponent } from './e-kaly-home.component';

describe('EKalyHomeComponent', () => {
  let component: EKalyHomeComponent;
  let fixture: ComponentFixture<EKalyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EKalyHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
