import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurHomeComponent } from './livreur-home.component';

describe('LivreurHomeComponent', () => {
  let component: LivreurHomeComponent;
  let fixture: ComponentFixture<LivreurHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreurHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreurHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
