import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPlatComponent } from './modifier-plat.component';

describe('ModifierPlatComponent', () => {
  let component: ModifierPlatComponent;
  let fixture: ComponentFixture<ModifierPlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierPlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
