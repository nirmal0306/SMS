import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsListComponent } from './residents-list.component';

describe('ResidentsListComponent', () => {
  let component: ResidentsListComponent;
  let fixture: ComponentFixture<ResidentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
