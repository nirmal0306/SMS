import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentNoticeComponent } from './resident-notice.component';

describe('ResidentNoticeComponent', () => {
  let component: ResidentNoticeComponent;
  let fixture: ComponentFixture<ResidentNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
