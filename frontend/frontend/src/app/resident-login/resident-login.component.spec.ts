import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentLoginComponent } from './resident-login.component';

describe('ResidentLoginComponent', () => {
  let component: ResidentLoginComponent;
  let fixture: ComponentFixture<ResidentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
