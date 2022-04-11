import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeAsignerComponent } from './commande-asigner.component';

describe('CommandeAsignerComponent', () => {
  let component: CommandeAsignerComponent;
  let fixture: ComponentFixture<CommandeAsignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeAsignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeAsignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
