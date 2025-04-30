import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterAboutComponent } from './after-about.component';

describe('AfterAboutComponent', () => {
  let component: AfterAboutComponent;
  let fixture: ComponentFixture<AfterAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
