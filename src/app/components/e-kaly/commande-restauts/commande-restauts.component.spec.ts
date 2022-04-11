import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeRestautsComponent } from './commande-restauts.component';

describe('CommandeRestautsComponent', () => {
  let component: CommandeRestautsComponent;
  let fixture: ComponentFixture<CommandeRestautsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeRestautsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeRestautsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
