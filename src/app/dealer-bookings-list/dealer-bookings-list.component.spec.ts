import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerBookingsListComponent } from './dealer-bookings-list.component';

describe('DealerBookingsListComponent', () => {
  let component: DealerBookingsListComponent;
  let fixture: ComponentFixture<DealerBookingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerBookingsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerBookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
