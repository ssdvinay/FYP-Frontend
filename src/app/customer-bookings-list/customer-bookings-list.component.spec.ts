import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBookingsListComponent } from './customer-bookings-list.component';

describe('CustomerBookingsListComponent', () => {
  let component: CustomerBookingsListComponent;
  let fixture: ComponentFixture<CustomerBookingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBookingsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
