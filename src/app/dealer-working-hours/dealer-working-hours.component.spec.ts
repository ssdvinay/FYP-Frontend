import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerWorkingHoursComponent } from './dealer-working-hours.component';

describe('DealerWorkingHoursComponent', () => {
  let component: DealerWorkingHoursComponent;
  let fixture: ComponentFixture<DealerWorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerWorkingHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
