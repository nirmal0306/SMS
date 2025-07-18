import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookParkingComponent } from './book-parking.component';

describe('BookParkingComponent', () => {
  let component: BookParkingComponent;
  let fixture: ComponentFixture<BookParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookParkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
