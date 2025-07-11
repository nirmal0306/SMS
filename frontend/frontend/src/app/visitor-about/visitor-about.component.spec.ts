import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAboutComponent } from './visitor-about.component';

describe('VisitorAboutComponent', () => {
  let component: VisitorAboutComponent;
  let fixture: ComponentFixture<VisitorAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
