import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerdetailsComponent } from './dealerdetails.component';

describe('DealerdetailsComponent', () => {
  let component: DealerdetailsComponent;
  let fixture: ComponentFixture<DealerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
